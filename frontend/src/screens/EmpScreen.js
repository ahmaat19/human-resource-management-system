import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const EmpScreen = () => {
  const [activeProfile, setActiveProfile] = useState(true)
  const [activePrivate, setActivePrivate] = useState(false)
  const [activeDocuments, setActiveDocuments] = useState(false)

  const [employeeId, setEmployeeId] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [hiredDate, setHiredDate] = useState('')
  const [national, setNational] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [Document, setDocument] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('done')
  }

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className='row g-3'>
          <div className='col-12'>
            <span className='form-control text-center bg-dark text-light fs-6 fw-light'>
              PROFILE INFO
              <span className='float-end'>
                {activeProfile ? (
                  <FaMinus onClick={() => setActiveProfile(false)} />
                ) : (
                  <FaPlus onClick={() => setActiveProfile(true)} />
                )}
              </span>
            </span>
          </div>
          {activeProfile && (
            <>
              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='employeeId'>Employee ID</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Employee ID'
                  name='employeeId'
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='employeeName'>Employee Name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Employee Name'
                  name='employeeName'
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='employmentType'>Employment Type</label>
                <select
                  type='text'
                  className='form-control'
                  name='employmentType'
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option value=''>---------</option>
                </select>
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='department'>Department</label>
                <select
                  type='text'
                  className='form-control'
                  name='department'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value=''>---------</option>
                </select>
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='position'>Position</label>
                <select
                  type='text'
                  className='form-control'
                  name='position'
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value=''>---------</option>
                </select>
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='hiredDate'>Hired Date</label>
                <input
                  type='date'
                  className='form-control'
                  name='hiredDate'
                  value={hiredDate}
                  onChange={(e) => setHiredDate(e.target.value)}
                />
              </div>
            </>
          )}
          <div className='col-12'>
            <span className='form-control text-center bg-dark text-light fs-6 fw-light'>
              PRIVATE INFO
              <span className='float-end'>
                {activePrivate ? (
                  <FaMinus onClick={() => setActivePrivate(false)} />
                ) : (
                  <FaPlus onClick={() => setActivePrivate(true)} />
                )}
              </span>
            </span>
          </div>

          {activePrivate && (
            <>
              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='national'>National</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='National'
                  name='national'
                  value={national}
                  onChange={(e) => setNational(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='birthday'>Birthday</label>
                <input
                  type='date'
                  className='form-control'
                  name='birthday'
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Address'
                  name='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='mobile'>Mobile</label>
                <input
                  type='number'
                  min='0'
                  className='form-control'
                  placeholder='Mobile'
                  name='mobile'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='col-lg-4 col-md-6 col-md-12 col-sm-12 col-12'>
                <label htmlFor='gender'>Gender</label>
                <select
                  type='text'
                  className='form-control'
                  name='gender'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value=''>---------</option>
                </select>
              </div>
            </>
          )}
          <div className='col-12'>
            <span className='form-control text-center bg-dark text-light fs-6 fw-light'>
              DOCUMENTS INFO
              <span className='float-end'>
                {activeDocuments ? (
                  <FaMinus onClick={() => setActiveDocuments(false)} />
                ) : (
                  <FaPlus onClick={() => setActiveDocuments(true)} />
                )}
              </span>
            </span>
          </div>
          {activeDocuments && (
            <div className='col-12'>
              <label htmlFor='document formFile'>
                Upload Employee Related Documents
              </label>
              <input
                type='file'
                className='form-control'
                id='formFile'
                name='document'
                onChange={(e) => setDocument(e.target.files[0])}
              />
            </div>
          )}

          <div className='col-12 text-right'>
            <button className='btn btn-dark  '>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmpScreen
