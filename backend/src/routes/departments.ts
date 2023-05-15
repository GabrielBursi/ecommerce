import { Router } from 'express'
import { DepartmentsControllers } from '../controllers'
import { myAuth } from '../shared/middleware'

export const routerDepartments = Router()

routerDepartments.get('/departments', DepartmentsControllers.GetAll)
routerDepartments.post('/departments', myAuth, DepartmentsControllers.createDepartmentValidation, DepartmentsControllers.Create)
