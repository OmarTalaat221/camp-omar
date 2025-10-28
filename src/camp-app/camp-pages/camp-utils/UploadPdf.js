import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";

export const PdfUploader = async (file) => await 
axios.post("https://camp-coding.tech/camp_for_english/admin/upload_pdf.php", file).catch((e)=>console.log(e))
