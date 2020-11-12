import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDepartments } from "../../actions/department";
import DiscountValidate from "../../validations/DiscountValidate";

const Discount = ({ getDepartments, departments }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    department: "",
    fatherName: "",
    motherName: "",
    isSingle: true,
    isMale: true,
    wives: "",
    husband: "",
    hasChildren: false,
    children: "",
  });

  const {
    empId,
    empName,
    department,
    fatherName,
    motherName,
    isSingle,
    isMale,
    wives,
    husband,
    hasChildren,
    children,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(DiscountValidate(formData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log(formData);
      setFormData({
        ...formData,
        empId: "",
        empName: "",
        department: "",
        fatherName: "",
        motherName: "",
        isSingle: true,
        isMale: true,
        wives: "",
        husband: "",
        hasChildren: false,
        children: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <div className='container mt-2'>
      <h5 className='text-center'>Employee Discount Form Request</h5> <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='row'>
          <div className='col-lg-10 col-md-12 col-sm-12 col-12 mx-auto'>
            {/* Employee Info */}
            <div className='row my-2 border border-secondary'>
              <h5 className='text-center text-uppercase text-light  '>
                Employee Info
              </h5>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                <div className='form-group'>
                  <label htmlFor=''>Emp. ID</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your ID'
                    name='empId'
                    value={empId}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.empId && (
                    <div className='form-text text-danger'>{errors.empId}</div>
                  )}
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                <label htmlFor=''>Emp. Name</label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your name'
                    name='empName'
                    value={empName}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.empName && (
                    <div className='form-text text-danger'>
                      {errors.empName}
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                <div className='form-group'>
                  <label htmlFor=''>Department</label>
                  <select
                    name='department'
                    value={department}
                    onChange={(e) => handleChange(e)}
                    className='form-control py-2'
                  >
                    <option value='' disabled>
                      Department...
                    </option>
                    {departments &&
                      departments.map((department) => {
                        return (
                          <option
                            key={department._id}
                            value={department._id}
                            onChange={(e) => handleChange(e)}
                          >
                            {department.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.department && (
                    <div className='form-text text-danger'>
                      {errors.department}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className='row my-2 border border-secondary'>
              <h5 className='text-center text-uppercase text-light  '>
                Parent Info
              </h5>
              <div className='col-lg-6 col-md-6 col-sm-12 col-12 '>
                <div className='form-group'>
                  <label htmlFor=''>Father Name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your father name'
                    name='fatherName'
                    value={fatherName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-12 '>
                <label htmlFor=''>Mother Name</label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your mother name'
                    name='motherName'
                    value={motherName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                id='genderSwitchCheckChecked'
                name='isMale'
                checked={isMale}
                onChange={(e) => setFormData({ ...formData, isMale: !isMale })}
              />
              <label
                className='form-check-label'
                htmlFor='genderSwitchCheckChecked'
              >
                Are you male?{" "}
                <span role='img' aria-label='img'>
                  👨
                </span>
              </label>
            </div>

            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                id='statusSwitchCheckChecked'
                name='isSingle'
                checked={isSingle}
                onChange={(e) =>
                  setFormData({ ...formData, isSingle: !isSingle })
                }
              />
              <label
                className='form-check-label'
                htmlFor='statusSwitchCheckChecked'
              >
                Are you still single?{" "}
                <span role='img' aria-label='img'>
                  😂
                </span>
              </label>
            </div>

            {!isSingle && (
              <>
                {isMale ? (
                  <>
                    {/* Wives Info */}
                    <div className='row my-2 border border-secondary'>
                      <h5 className='text-center text-uppercase text-light  '>
                        Wives Info
                      </h5>
                      <div className='col-12 '>
                        <label htmlFor=''>Wives Name</label>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the name of your wives'
                            name='wives'
                            value={wives}
                            onChange={(e) => handleChange(e)}
                            id='wives'
                          />
                          <div id='wives' className='form-text'>
                            Please use comma separated wives name if you have
                            more than one wife (eg. Fatima,Zahra,Maria,Sophia)
                          </div>
                          {errors.wives && (
                            <div className='form-text text-danger'>
                              {errors.wives}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Husband Info */}
                    <div className='row my-2 border border-secondary'>
                      <h5 className='text-center text-uppercase text-light  '>
                        Husband Info
                      </h5>
                      <div className='col-12 '>
                        <label htmlFor=''>Husband Name</label>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the name of your husband'
                            name='husband'
                            value={husband}
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.husband && (
                            <div className='form-text text-danger'>
                              {errors.husband}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='childrenSwitchCheckChecked'
                    name='hasChildren'
                    checked={hasChildren}
                    onChange={(e) =>
                      setFormData({ ...formData, hasChildren: !hasChildren })
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor='childrenSwitchCheckChecked'
                  >
                    Do you have any children?{" "}
                    <span role='img' aria-label='img'>
                      🧒
                    </span>
                  </label>
                </div>

                {hasChildren && (
                  <>
                    {/* Children Info */}
                    <div className='row my-2 border border-secondary'>
                      <h5 className='text-center text-uppercase text-light  '>
                        Children Info
                      </h5>
                      <div className='col-12 '>
                        <label htmlFor=''>Children's Name</label>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the name of your children'
                            name='children'
                            value={children}
                            onChange={(e) => handleChange(e)}
                            id='children'
                          />
                          <div id='children' className='form-text'>
                            Please use comma separated children's name if you
                            have more than one child (eg.
                            Mohamed,Fatima,Ahmed,Leila)
                          </div>
                          {errors.children && (
                            <div className='form-text text-danger'>
                              {errors.children}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <div className='row mb-5'>
              <div className='col-12'>
                <button className='btn form-control btn-info'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  departments: state.department.departments,
});

export default connect(mapStateToProps, { getDepartments })(Discount);
