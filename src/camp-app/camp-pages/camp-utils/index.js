import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";

export const imageUploader = async (file) => await 
axios.post(BASE_URL + "/admin/item_img_uploader.php", file).catch((e)=>console.log(e))
