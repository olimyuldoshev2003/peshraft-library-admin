import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Profile = () => {
  return (
    <>
      <div className="profile_component">
        <div className="profile_component_block">
          <div className="header_profile_component px-7">
            <div className="label_select_book_category flex flex-col gap-2">
              <label
                htmlFor="language"
                className="cursor-pointer text-[15px] font-500"
              >
                Language
              </label>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="language"
                  label="Language"
                >
                  <MenuItem
                    value={""}
                    sx={{
                      color: "gray",
                    }}
                    disabled
                  >
                    Language
                  </MenuItem>
                  <MenuItem value={"en"}>English</MenuItem>
                  <MenuItem value={"ru"}>Russian</MenuItem>
                  <MenuItem value={"tj"}>Tajik</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="section_profile_component">
            <div className="section_block_1"></div>
          </div>
          <div className="footer_profile_component"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
