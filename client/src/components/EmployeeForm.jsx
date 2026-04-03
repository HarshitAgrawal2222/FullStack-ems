import { useState } from "react"
import { useNavigate } from "react-router-dom"

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const isEditMode = !!initialData

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
   <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl animate-fade-in">
    {/* Personal Information */}
<div className="card p-5 sm:p-6">
  <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
    Personal Information
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
    
    <div>
      <label className="block mb-2">First Name</label>
      <input
        name="firstName"
        required
        defaultValue={initialData?.firstName}
      />
    </div>

    <div>
      <label className="block mb-2">Last Name</label>
      <input
        name="lasttName"
        required
        defaultValue={initialData?.lasttName}
      />
    </div>

    <div>
      <label className="block mb-2">Phone Number</label>
      <input
        name="phone"
        required
        defaultValue={initialData?.phone}
      />
    </div>

    <div>
      <label className="block mb-2">Join Date</label>
      <input
        type="date"
        name="joinDate"
        required
        defaultValue={initialData?.joinDate?new Date(initialData.joinDate).toISOString().split("T")[0]:""}
      />
    </div>

  </div>
</div>
   </form>
  )
}

export default EmployeeForm