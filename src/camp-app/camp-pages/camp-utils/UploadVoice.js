import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";

export const voiceUploader = async (file) => await
    axios.post("https://camp-coding.online/camp-for-english/admin/upload_voice.php", file).catch((e) => console.log(e))
