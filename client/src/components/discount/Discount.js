import React from "react";

const Discount = () => {
  return (
    <div className='container mt-2'>
      <h5 className='text-center'>Employee Discount Record</h5> <hr />
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
                />
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <label htmlFor=''>Emp. Name</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your name'
                />
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <div className='form-group'>
                <label htmlFor=''>Department</label>
                <select name='' className='form-control form-select' id=''>
                  <option value='ICU'>ICU</option>
                  <option value='Laboratory'>Laboratory</option>
                  <option value='Inpatient'>Inpatient</option>
                </select>
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
                />
              </div>
            </div>
          </div>

          <div class='form-check form-switch'>
            <input
              class='form-check-input'
              type='checkbox'
              id='flexSwitchCheckChecked'
              checked
            />
            <label class='form-check-label' for='flexSwitchCheckChecked'>
              Are you still single? 😂
            </label>
          </div>

          {/* Wife Info */}
          <div className='row my-2 border border-secondary'>
            <h5 className='text-center text-uppercase text-light  '>
              Wife Info
            </h5>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <div className='form-group'>
                <label htmlFor=''>Number of Wife</label>
                <select name='' className='form-control form-select' id=''>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </select>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <label htmlFor=''>1st Lady</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the name of your 1st wife'
                />
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <label htmlFor=''>2nd Lady</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the name of your 2nd wife'
                />
              </div>
            </div>
          </div>

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
                />
              </div>
            </div>
          </div>

          <div class='form-check form-switch'>
            <input
              class='form-check-input'
              type='checkbox'
              id='flexSwitchCheckChecked'
              checked
            />
            <label class='form-check-label' for='flexSwitchCheckChecked'>
              Do you have any children? 🧒
            </label>
          </div>

          {/* Children Info */}
          <div className='row my-2 border border-secondary'>
            <h5 className='text-center text-uppercase text-light  '>
              Children Info
            </h5>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <div className='form-group'>
                <label htmlFor=''>Number of Children</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Enter the name of your child'
                />
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <label htmlFor=''>Child 1</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the name of your child'
                />
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
              <label htmlFor=''>Child 2</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the name of your child'
                />
              </div>
            </div>
          </div>
          <div className='row mb-5'>
            <div className='col-12'>
              <button className='btn form-control btn-info'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
