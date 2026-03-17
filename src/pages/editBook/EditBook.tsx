import { useState } from "react";

// Img
import noImg from "../../assets/no-img.jpg";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const EditBook = () => {
  const [imgBook, setImgBook] = useState<any>(null);
  const [imgBgBook, setImgBgBook] = useState<any>(null);
  const [categoryValue, setCategoryValue] = useState<string>("");

  //Handle Change of image
  const handleBookImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        console.log(event.target.result);
        setImgBook(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBookBgImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        console.log(event.target.result);
        setImgBgBook(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="edit_book_component px-4 py-4">
        <div className="edit_book_component_block flex sm:flex-col lg:flex-row lg:justify-center lg:items-end gap-10">
          <div className="block_img_book_and_bg_book_and_input_book_component flex sm:flex-row lg:flex-col sm:justify-center lg:justify-start sm:flex-wrap md:flex-nowrap gap-12">
            <div className="img_and_input_book flex flex-col gap-3">
              {imgBook ? (
                <img
                  className="w-38.25 h-53.75 shadow-2xl object-contain rounded-[10px]"
                  src={imgBook}
                  alt=""
                />
              ) : (
                <img
                  className="w-38.25 h-53.75 shadow-2xl object-cover rounded-[10px]"
                  src={noImg}
                  alt=""
                />
              )}
              <div className="label_and_input_book_img flex flex-col gap-1">
                <label
                  htmlFor="edit_book_img"
                  className="text-[15px] text-[gray] cursor-pointer"
                >
                  Book Image
                </label>
                <input
                  type="file"
                  className="rounded-[5px] max-w-55 outline-none px-3 shadow-xl py-1 bg-white cursor-pointer"
                  name=""
                  id="edit_book_img"
                  onChange={handleBookImageChange}
                />
              </div>
            </div>
            <div className="img_bg_and_input_book flex flex-col gap-3">
              {imgBgBook ? (
                <img
                  className="w-38.25 h-53.75 shadow-2xl object-contain rounded-[10px]"
                  src={imgBgBook}
                  alt=""
                />
              ) : (
                <img
                  className="w-38.25 h-53.75 shadow-2xl object-cover rounded-[10px]"
                  src={noImg}
                  alt=""
                />
              )}
              <div className="label_and_input_book_bg_img flex flex-col gap-1">
                <label
                  htmlFor="edit_book_bg_img"
                  className="text-[15px] text-[gray] cursor-pointer"
                >
                  Book Background Image
                </label>
                <input
                  type="file"
                  className="rounded-[5px] max-w-55 outline-none px-3 shadow-xl py-1 bg-white cursor-pointer"
                  name=""
                  id="edit_book_bg_img"
                  onChange={handleBookBgImageChange}
                />
              </div>
            </div>
          </div>
          <div className="labels_select_and_inputs_block">
            <div className="first_block grid sm:grid-cols-1 md:grid-cols-2 gap-10">
              <div className="label_input_book_name flex flex-col gap-2">
                <label
                  htmlFor="edit_book_name"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Book Title
                </label>
                <TextField
                  id="edit_book_name"
                  label="Name of book"
                  variant="outlined"
                />
              </div>
              <div className="label_select_book_category flex flex-col gap-2">
                <label
                  htmlFor="edit_category"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Category
                </label>

                <FormControl fullWidth>
                  <InputLabel id="edit-demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="edit-demo-simple-select-label"
                    id="edit_category"
                    label="Category"
                    value={categoryValue}
                    onChange={(event: any) => {
                      setCategoryValue(event.target.value);
                    }}
                  >
                    <MenuItem
                      value={""}
                      sx={{
                        color: "gray",
                      }}
                    >
                      None
                    </MenuItem>
                    <MenuItem value={"fantasy"}>Fantasy</MenuItem>
                    <MenuItem value={"finance"}>Finance</MenuItem>
                    <MenuItem value={"drama"}>Drama</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="label_input_publication_year flex flex-col gap-2">
                <label
                  htmlFor="edit_publication_year"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Publication Year
                </label>
                <TextField
                  id="edit_publication_year"
                  label="Publicated Year"
                  variant="outlined"
                  type="number"
                />
              </div>
              <div className="label_input_author_name flex flex-col gap-2">
                <label
                  htmlFor="edit_author_name"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Author
                </label>
                <TextField
                  id="edit_author_name"
                  label="Author Name"
                  variant="outlined"
                />
              </div>
              <div className="label_input_page_size flex flex-col gap-2">
                <label
                  htmlFor="edit_page-size"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Page Count
                </label>
                <TextField
                  id="edit_page-size"
                  label="Page Size"
                  variant="outlined"
                  type="number"
                />
              </div>
              <div className="label_input_language flex flex-col gap-2">
                <label
                  htmlFor="edit_language"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Language
                </label>
                <TextField
                  id="edit_language"
                  label="Language Name"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="second_block flex flex-col gap-2 mt-4">
              <label htmlFor="edit_book_info">Summary Book</label>
              <textarea
                name=""
                id="edit_book_info"
                placeholder="Book Information"
                className="outline-none border-[3px] border-[#DFEAF2] rounded-[15px] p-1 h-52"
              ></textarea>
            </div>
          </div>
          <div className="block_btn_submit">
            <Link to={"/dashboard/books"}>
              <button className="btn_submit bg-[#20ACFF] px-5 py-2 rounded-[15px] cursor-pointer text-[#FFFFFF] text-[19px] font-500 sm:w-full">
                Update Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBook;
