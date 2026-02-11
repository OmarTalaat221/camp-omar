import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";

export const voiceUploader = async (file) =>
  await axios
    .post(
      "https://campforenglish.net/camp_for_english/admin/upload_voice.php",
      file
    )
    .catch((e) => console.log(e));
