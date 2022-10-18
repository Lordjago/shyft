import {Router} from "express";
import { getHomeDirectory, getRepoStars, searchString } from "../controller/routeController.js";

const router = Router();

router.get("/", getHomeDirectory)

router.get("/github/repo_info/:owner/:repo_name", getRepoStars)

router.get("/search/:searchString", searchString)

export default router;