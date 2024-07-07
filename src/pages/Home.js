import React, { useState } from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { v4 as uuidV4} from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    
    const createNewRoom = (e) => {
        e.preventDefault(); // stops the page from reloading on the clicking the button
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room')
    };

    const joinRoom = () => {
        if(!roomId || !username ){
            toast.error("Room Id and Username is required");
            return;
        }
        else{
            toast.success("Room created successfuly");
        }

        //Redirect to the editing page
        navigate(`/editor/${roomId}`, {
            state: {
                username,  // ek route se dusre route me data pass krr skte ho using react router giving state option
            }
        })
    };

    const handleInputEnter = (e) => {
        if(e.code === 'Enter'){
            joinRoom();
        }
    }
    return (
        <div className='homePageWrapper'>
            <div className='formWrapper'>
                <img src='/code-connection.png' alt='logo' />
                <h4 className='mainLable'>Paste Invitation ROOM ID</h4>
                <div className='inputGroup'>
                    <div className='textInputWrapper'>
                        <input
                            type="text"
                            className="textInput"
                            placeholder='ROOM ID'
                            onChange={(e) => setRoomId(e.target.value)} //if someone manually adds the id then it should also be stored in it. 
                            value={roomId}
                            onKeyUp={handleInputEnter}
                        />
                    </div>
                    <div className='textInputWrapper'>
                        <input
                            type="text"
                            className="textInput"
                            placeholder='USERNAME'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            onKeyUp={handleInputEnter}
                        />
                    </div>
                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                    <span className='createInfo'>
                        If you don't have an invite then create&nbsp;
                        <a onClick={createNewRoom} href='' className='createNewBtn'>New Room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Created By Swar Shah &nbsp;
                <a  href='https://github.com/swarshah09' className='iconlink'><FaGithub/>&nbsp;</a>
                <a href='https://www.linkedin.com/in/swar-shah-190a84218/' className='iconlink'><FaLinkedin/>&nbsp;</a>
                <a  href='https://www.instagram.com/swarshahhh/' className='iconlink'><FaInstagram /></a>
                </h4>
            </footer>
        </div>
    )
}

export default Home
