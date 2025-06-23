import { Platform } from "react-native";
import ProfileImage from './../assets/images/profile.png'
import { ADDRESS } from "./api";


function log(...args) {
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];

    // Stringify and indent objects for readability
    if (typeof arg === 'object' && arg !== null) {
      arg = JSON.stringify(arg, null, 2);
    }

    console.log(`[${Platform.OS}]`,arg);
  }
}

function thumbnail(url){
  if (!url){
    return ProfileImage
  }
  return {

    uri: 'http://'+ADDRESS+url
  }
}

export default { log, thumbnail };
