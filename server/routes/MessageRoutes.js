import { Router } from "express";
import { addMessage, getMessages,addImageMessage,addAudioMessage ,getInitialContactWithMessages} from "../controllers/MessageController.js";
import multer from "multer";

const router = Router()

const uploadAudio = multer({dest:"uploads/recordings"})
const uploadImage = multer({dest:"uploads/images"})

router.post("/add-message",addMessage)
router.get("/get-messages/:from/:to",getMessages)
router.post("/add-image-message",uploadImage.single("image"),addImageMessage)
router.post("/add-audio-message",uploadAudio.single("audio"),addAudioMessage)
router.get("/get-initial-contacts/:from",getInitialContactWithMessages)

export default router