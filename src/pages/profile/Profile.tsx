import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Profile = () => {
  return (
    <>
      <div className="profile_component">
        <div className="profile_component_block p-5">
          <div className="header_profile_component shadow-[0_0_8px_#00000040] rounded-xl px-7 py-4">
            <div className="label_select_book_category flex flex-col gap-2">
              {/* <label
                htmlFor="language"
                className="cursor-pointer text-[15px] font-500"
              >
                 Language
              </label> */}

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
          <div className="section_profile_component mt-6">
            <h1 className="text-[24px] font-600">Profile</h1>
            <form
              action=""
              className="edit_profile_form shadow-[0_0_8px_#00000040] rounded-xl px-7 py-4 mt-2"
            >
              <div className="block_edit_img"></div>
              <div className="labels_and_inputs_edit_profile">
                <div className="form_edit_profile_block_1_fullname">
                  <label
                    htmlFor="fullname"
                    className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                  >
                    Full Name
                  </label>
                  <TextField
                    id="fullname"
                    label="Enter your full name (first and last name)"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginTop: 1,
                    }}
                  />
                </div>
                <div className="form_sign_up_block_2_date_of_birth">
                  <label
                    htmlFor="dateOfBirth"
                    className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                  >
                    Date of Birth
                  </label>
                  <TextField
                    id="dateOfBirth"
                    label="Enter your date of birth"
                    variant="outlined"
                    fullWidth
                    // value={dateOfBirth}
                    // onChange={(e) => setDateOfBirth(e.target.value)}
                    // onBlur={() => handleBlur("dateOfBirth")}
                    // error={shouldShowError("dateOfBirth")}
                    // helperText={
                    //   shouldShowError("dateOfBirth") ? errors.dateOfBirth : ""
                    // }
                    sx={{
                      marginTop: 1,
                    }}
                    type="date"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="footer_profile_component"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
