import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com";

export async function getPhoto(query, page) {
    const options = {
        key: "40315743-946dc4202327f4239c0c67201",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 40,
    };
    try {
        const { data } = await axios('/api/', { params: options });
        return data;
        
    } catch (error) {
        console.log(error.message)
    }
}
