import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import Toast from '../../components/Toast';
import EmptyCard from '../../components/EmptyCard';

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit"});
  };

  const showToastMessage = (message, type) => {
    setShowToast({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: "",
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All notes
  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch(error) {
      console.log("An expected error occured. Please try again")
    }
  };

  // Delete Note API
  const deleteNote = async (data) => {
    const noteId = data._id;

    try{
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error){
          showToastMessage("Note Deleted Successfully!!", 'delete')
          getAllNotes();
      }
    }catch(error){
        if(error.response && error.response.data && error.response.message){
          console.log("An expected error occured. Please try again");        
        }
    }
  };

  // Search fo a note
  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get("/search-notes",{
        params: { query },
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error){
      console.log(error);
    }
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try{
      const response = await axiosInstance.put("/update-note-pinned/" + noteId,{
          isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note){
          showToastMessage("Note Updated Successfully!!")
          getAllNotes();
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Header Section */}
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <h1 className='text-3xl font-display font-bold text-gray-800'>
                  My Notes
                </h1>
                <p className='text-gray-600 mt-1'>
                  {isSearch ? `Search results for "${allNotes.length}" notes` : `You have ${allNotes.length} notes`}
                </p>
              </div>
              
              {isSearch && (
                <button 
                  onClick={handleClearSearch}
                  className='px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-white rounded-lg border border-gray-200 transition-all duration-200'
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>

          {/* Notes Grid */}
          {allNotes.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {allNotes.map((item, index) => (
                <div key={item._id} className='animate-fade-in' style={{ animationDelay: `${index * 0.1}s` }}>
                  <NoteCard 
                    title={item.title} 
                    date={item.createdOn} 
                    content={item.content}
                    tags={item.tags} 
                    isPinned={item.isPinned} 
                    onEdit={() => handleEdit(item)} 
                    onDelete={() => deleteNote(item)} 
                    onPinNote={() => updateIsPinned(item)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyCard onCreateNote={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null});
            }} />
          )}
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <button 
        className='group fixed right-6 bottom-6 w-16 h-16 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-2xl shadow-large hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50 md:right-8 md:bottom-8 flex items-center justify-center'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null});
        }}
      >
        <div className='relative flex items-center justify-center w-full h-full'>
          <MdAdd className="text-3xl transition-transform duration-300 group-hover:rotate-90" />
          <div className='absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        
        {/* Tooltip */}
        <div className='absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap'>
          Add New Note
          <div className='absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent'></div>
        </div>
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)"
          },
        }}
        contentLabel=""
        className="w-[90%] max-w-2xl max-h-[90vh] bg-white rounded-2xl mx-auto mt-14 p-6 shadow-large"
      >
        <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type:"add", data: null});
          }} 
          getAllNotes={getAllNotes} 
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast 
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home