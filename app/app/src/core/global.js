import { create } from "zustand";
import Secure from "@/core/secure";
import api from "./api";
import utils from "./utils";
import { ADDRESS } from "./api";

// --------------------------------
// Socket recive message handler
// --------------------------------

function responseThumbnail(set, get, data) {
  set((state) => ({
    user: data,
  }));
}

function responseDevices(set, get, data) {
  const devices = data.map(device => ({
    id: device.device_id,
    name: device.device_name,
    location: device.location,
    status: device.status,
    created_at: device.created_at,
  }));

  set((state) => ({
    devices: [...state.devices, ...devices], 
  }));
}
function responseDeviceData(set, get, data) {
  const deviceData = data.map(device => ({
    id: deviceData.device_id,
    dataType: deviceData.data_type,
    value: deviceData.value,
    timestamp: deviceData.timestamp,
  }));

  set((state) => ({
    deviceData: [...state.deviceData, ...deviceData], 
  }));
}

const useGlobal = create((set, get) => ({
  // --------------
  // Initialization
  // --------------

  initialized: false,
  devices: [],
  deviceData:[],
  setDevices: (newDevices) => set({ devices: newDevices }),

  // Fetch devices from the API

  init: async () => {
    const credentials = await Secure.get("credentials"); // Ensure you await the get method

    if (credentials) {
      try {
        const response = await api({
          method: "POST",
          url: "/automation/signin/",
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (response.status !== 200) {
          throw new Error("Authentication error");
        }

        const user = response.data.user;
        const tokens = response.data.tokens;

        Secure.set("tokens", tokens);

        set((state) => ({
          initialized: true,
          authenticated: true,
          user: user,
        }));
        return;
      } catch (error) {
        console.log("useGlobal.init: ", error);
      }
    }

    set((state) => ({
      initialized: true,
    }));
  },

  // ---------------
  // Authentication
  // ---------------

  authenticated: false, // Start as not authenticated
  user: {},

  login: (credentials, user, tokens) => {
    Secure.set("credentials", credentials);
    Secure.set("tokens", tokens);

    set(() => ({
      authenticated: true,
      user: user,
    }));
  },

  logout: () => {
    Secure.remove("credentials");
    set(() => ({
      authenticated: false,
      user: {},
    }));
  },

  // ---------------
  // Websocket
  // ---------------

  socket: null,

  socketConnect: async () => {
    const tokens = await Secure.get("tokens");
    const url = `ws://${ADDRESS}/ws/automation/?token=${tokens.access}`;
    // utils.log(url);

    const socket = new WebSocket(url);
    socket.onopen = (e) => {
      get().fetchDevices();
      utils.log("socket.onopen", e.message);
    };
    socket.onclose = () => {
      utils.log("socket.onclose");
    };
    socket.onmessage = (event) => {
      // convert data into javascript format
      const parsed = JSON.parse(event.data);

      // Debug loged formated data
      utils.log("socket.onmessage", parsed);

      const responses = {
        thumbnail: responseThumbnail,
        devices: responseDevices,
        deviceData : responseDeviceData,
      };
      const resp = responses[parsed.source];
      if (!resp) {
        utils.log('parsed.source "' + parsed.souce + '" not found ');
        return;
      }
      // Call response function
      resp(set, get, parsed.data);
    };
    socket.onerror = (e) => {
      utils.log("socket.onerror", e.message);
    };

    set((state) => ({
      socket: socket,
    }));

    utils.log("TOKEN: ", tokens);
  },

  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set((state) => ({
      socket: null,
    }));
  },

  // ----------------------------------
  // Devices and Device Data fetching
  // ----------------------------------
  fetchDevices: async () => {
    const tokens = await Secure.get("tokens");
    const socket = get().socket; // Ensure you get the current socket instance
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          source: "fetch_devices",
        })
      );
    } else {
      utils.log("Fail to fetch devices.");
    }
  },

  fetchDevicedata: async (device_id, period) => {
    const tokens = await Secure.get("tokens");
    const socket = get().socket; 
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          source: "device_data_request",
          id :device_id,
          duration: period,
        })
      );
    } else {
      utils.log("Fail to fetch device data.");
    }
  },

  // ---------------
  // thumbnail
  // ---------------

  uploadThumbnail: (file) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "thumbnail",
        base64: file.base64,
        filename: file.fileName,
      })
    );
  },

  // ---------------
  // Add Device
  // ---------------

  newDevice: (deviceObj) => {
    const socket = get().socket;
    if (socket && socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          source: "add_device",
          data: deviceObj,
        })
      );
    } else {
      utils.log("WebSocket is not connected.");
    }
  },
}));

export default useGlobal;
