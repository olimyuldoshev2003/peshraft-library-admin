import { HiOutlineSearch } from "react-icons/hi";

import userImg from "../../assets/user-img.svg";
import { LuPlus } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";

const Notifications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);
  const [modalAddNotification, setModalAddNotification] =
    useState<boolean>(false);
  const [modalEditNotification, setModalEditNotification] =
    useState<boolean>(false);
  const [modalDeleteNotification, setModalDeleteNotification] =
    useState<boolean>(false);
  const [userIdValue, setUserIdValue] = useState("");
  const [notificationTypeValue, setNotificationTypeValue] = useState("");

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="notifications_component p-4">
        <div className="notifications_component_block">
          <div className="header_notifications_component flex justify-between items-center gap-6">
            <div className="search_logo_and_search_input relative flex-1">
              <HiOutlineSearch size={24} className="absolute top-4 left-4" />
              <input
                type="search"
                className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-3 rounded-[30px] text-[20px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
                placeholder="Search enter..."
              />
            </div>
            <div className="fullname_img_of_admin_and_admin_title sm:hidden md:flex items-center gap-3">
              <div className="fullname_of_user_and_admin_title">
                <h1 className="text-[22px] font-500">Suhrob H.</h1>
                <h1 className="text-[#808080] text-[15px] font-400 text-right">
                  Admin
                </h1>
              </div>
              <img className="w-14 h-14" src={userImg} alt="" />
            </div>
          </div>

          <div className="section_notifications_component mt-7">
            <div className="title_and_btn_add_notifications_block flex justify-between items-center gap-2">
              <h1 className="title_notitfications text-[24px] font-medium">
                Overdue Returns List
              </h1>
              <div className="btn_add_block flex justify-between items-center gap-6">
                <button
                  className="flex items-center gap-2 bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer"
                  onClick={() => {
                    setModalAddNotification(true);
                  }}
                >
                  <LuPlus />
                  <span className="sm:hidden md:block">Add Notification</span>
                </button>
              </div>
            </div>
            <div className="notifications_block mt-6 flex flex-col gap-3">
              {/* Notification 1 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 2 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 3 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 4 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 5 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 6 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 7 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 8 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 9*/}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
              {/* Notification 10 */}
              <div className="notification_container flex justify-between gap-5 shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-bold">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    onClick={() => {
                      setModalEditNotification(true);
                    }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                    onClick={() => {
                      setModalDeleteNotification(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="pagination_notfications">
              <TablePagination
                rowsPerPageOptions={[17, 10, 8, 5]}
                component="div"
                count={1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>

            {/* Modal Add Notification */}
            <Dialog
              open={modalAddNotification}
              onClose={() => {
                setModalAddNotification(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{}}
              fullWidth
            >
              <div className="modal_add_notification_block px-4 py-4">
                <div className="header_modal_add_notification flex items-center gap-6 justify-between">
                  <h1 className="text-[26px] font-600">Add Notification</h1>
                  <button
                    className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                    onClick={() => {
                      setModalAddNotification(false);
                    }}
                  >
                    <MdOutlineClose size={27} className="" />
                  </button>
                </div>
                <div className="section_modal_add_notification">
                  <form action="" className="form flex flex-col gap-2">
                    <div className="label_select_user flex flex-col gap-2">
                      <label
                        htmlFor="user_select"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        For
                      </label>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select The User
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="user_select"
                          label="Select the User"
                          value={userIdValue}
                          onChange={(event: any) => {
                            setUserIdValue(event.target.value);
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
                          <MenuItem value={"1"}>Olim Yuldoshev</MenuItem>
                          <MenuItem value={"2"}>Abubakr Akobirov</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="label_select_notification_type flex flex-col gap-2">
                      <label
                        htmlFor="notification_type"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        Notification Type
                      </label>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Type of Notification
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="notification_type"
                          label="Type of Notification"
                          value={notificationTypeValue}
                          onChange={(event: any) => {
                            setNotificationTypeValue(event.target.value);
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
                          <MenuItem value={"duetime"}>Duetime</MenuItem>
                          <MenuItem value={"news"}>News</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="label_input_title flex flex-col gap-2">
                      <label
                        htmlFor="title"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        Title
                      </label>
                      <TextField
                        id="title"
                        label="Title of Notification"
                        variant="outlined"
                      />
                    </div>
                    <div className="label_textarea_description flex flex-col gap-2">
                      <label
                        htmlFor="notification_desc"
                        className=" cursor-pointer text-[15px] font-500"
                      >
                        Description
                      </label>
                      <textarea
                        name=""
                        id="notification_desc"
                        placeholder="Description"
                        className="outline-none border-[3px] border-[#DFEAF2] rounded-[15px] p-1 h-52"
                      ></textarea>
                    </div>
                    <div className="btn_submit_block mt-2">
                      <button className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog>

            {/* Modal Edit Notification */}
            <Dialog
              open={modalEditNotification}
              onClose={() => {
                setModalEditNotification(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{}}
              fullWidth
            >
              <div className="modal_edit_notification_block px-4 py-4">
                <div className="header_modal_edit_notification flex items-center gap-6 justify-between">
                  <h1 className="text-[26px] font-600">Edit Notification</h1>
                  <button
                    className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                    onClick={() => {
                      setModalAddNotification(false);
                    }}
                  >
                    <MdOutlineClose size={27} className="" />
                  </button>
                </div>
                <div className="section_modal_edit_notification">
                  <form action="" className="form flex flex-col gap-2">
                    <div className="label_select_user flex flex-col gap-2">
                      <label
                        htmlFor="user_select"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        For
                      </label>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select The User
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="user_select"
                          label="Select the User"
                          value={userIdValue}
                          onChange={(event: any) => {
                            setUserIdValue(event.target.value);
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
                          <MenuItem value={"1"}>Olim Yuldoshev</MenuItem>
                          <MenuItem value={"2"}>Abubakr Akobirov</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="label_select_notification_type flex flex-col gap-2">
                      <label
                        htmlFor="notification_type"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        Notification Type
                      </label>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Type of Notification
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="notification_type"
                          label="Type of Notification"
                          value={notificationTypeValue}
                          onChange={(event: any) => {
                            setNotificationTypeValue(event.target.value);
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
                          <MenuItem value={"duetime"}>Duetime</MenuItem>
                          <MenuItem value={"news"}>News</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="label_input_title flex flex-col gap-2">
                      <label
                        htmlFor="title"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        Title
                      </label>
                      <TextField
                        id="title"
                        label="Title of Notification"
                        variant="outlined"
                      />
                    </div>
                    <div className="label_textarea_description flex flex-col gap-2">
                      <label
                        htmlFor="notification_desc"
                        className="cursor-pointer text-[15px] font-500"
                      >
                        Description
                      </label>
                      <textarea
                        name=""
                        id="notification_desc"
                        placeholder="Description of Notification"
                        className="outline-none border-[3px] border-[#DFEAF2] rounded-[15px] p-1 h-52"
                      ></textarea>
                    </div>
                    <div className="btn_submit_block mt-2">
                      <button className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog>
            <Dialog
              open={modalDeleteNotification}
              onClose={() => {
                setModalDeleteNotification(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{}}
              fullWidth
            >
              <div className="modal_delete_notification_block px-4 py-4">
                <div className="header_delete_notification_block flex items-center gap-6 justify-between">
                  <h1 className="text-[26px] font-600">Delete Notification</h1>
                  <button
                    className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                    onClick={() => {
                      setModalDeleteNotification(false);
                    }}
                  >
                    <MdOutlineClose size={27} className="" />
                  </button>
                </div>
                <DialogTitle>
                  {
                    "Are you sure to delete this notification? This action can't be undone"
                  }
                </DialogTitle>
                <div className="block_btns flex gap-5 justify-between">
                  <button
                    className="hover:bg-[#20ACFF] p-2.5 rounded-[10px] text-[#20ACFF] hover:text-white text-[18px] font-500 cursor-pointer w-full duration-300"
                    onClick={() => {
                      setModalDeleteNotification(false);
                    }}
                  >
                    No
                  </button>
                  <button className="hover:bg-[red] text-[red] p-2.5 rounded-[10px] hover:text-white text-[18px] font-500 cursor-pointer w-full duration-300">
                    Yes
                  </button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
