import { getDashboardData } from "../controllers/dashboardController"
import { protect } from "../middleware/auth"




const dashboardRouter = Router()

dashboardRouter.get("/",protect,getDashboardData)

export default dashboardRouter;