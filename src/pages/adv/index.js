import React, { useEffect, useRef, useState } from 'react';
import "../styles/global-n.css";

import { resources } from "./config.js";
import { baseUrl } from "../../config/constants.js";
import axios from 'axios';
import { Link } from 'react-router-dom';

let emptyResListMap = {};
function initResouceMap() {
  Object.keys(resources).forEach((r, i) => {
    emptyResListMap[r] = [];
  })
}
initResouceMap();

export default function Main() {

  const [data, setData] = useState({
    name: "", publisher: "", firstRelease: "", latestRelease: "",
    callsCount: "", documentation: "", currentVersion: "",
    type: "", tools: "", dataFormats: "",
    fhirCompliant: "", nonFhirEndpoints: "", sandbox: "",
    databaseType: "", otherConnection: "", openApi: "",
    openPricing: true,
    contactName: "", email: ""
  });

  const [fhirResTitle, setFhirResTitle] = useState([]);

  const helpRef = useRef();

  function handleFhirResTitleChange({ target }) {
    const { name } = target;
    if (fhirResTitle.includes(name)) {
      setFhirResTitle(prev => prev.filter(p => p !== name));
    } else {
      setFhirResTitle(prev => [...prev, name]);
    }
  }

  const [fhirResList, setFhirResList] = useState(emptyResListMap);
  function handleFhirResListChange({ target }) {
    const { name, value } = target;
    if (fhirResList[name].includes(value)) {
      let modified = fhirResList[name].filter(e => e !== value);
      setFhirResList(prev => ({ ...prev, [name]: modified }));
    } else {
      let modified = [...fhirResList[name], value];
      setFhirResList(prev => ({ ...prev, [name]: modified }));
    }
  }

  const navBasic = useRef();
  const navEndpoint = useRef();
  const navAccess = useRef();

  function handleBasicFormSubmit(e) {
    e.preventDefault();
    handleNext('BASIC');
  }

  function handleResourceFormSubmit(e) {
    e.preventDefault();
    handleNext('ENDPOINT');
  }

  async function handleAccessFormSubmit(e) {
    e.preventDefault();
    try {
      let r = fhirResTitle.map((t, i) => ({ title: t, items: fhirResList[t] }))
      await axios.post(baseUrl + '/api-cards', { ...data, resources: r });
      alert("Success");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  function handleInputChanges({ target }) {
    setData(prev => ({ ...prev, [target.name]: target.value }));
  }

  function handleCheckboxChange({ target }) {
    const { name, value } = target;
    if (data[name].includes(value)) {
      let modified = data[name].filter(e => e !== value);
      setData(prev => ({ ...prev, [name]: modified }));
    } else {
      let modified = [...data[name], value];
      setData(prev => ({ ...prev, [name]: modified }));
    }
  }

//   const topRef = useRef();
//   useEffect(() => {
//     topRef.current.scrollIntoView()
//   }, [])


  function handleSelectChange({ target }) {
    if (/true|false/.test(target.value)) {
      setData(prev => ({ ...prev, [target.name]: /true/.test(target.value) }));
    } else {
      setData(prev => ({ ...prev, [target.name]: target.value }));
    }
  }

  function handleBack(current) {
    switch (current) {
      case 'ENDPOINT': navBasic.current.click(); break;
      case 'ACCESS': navEndpoint.current.click(); break;
      default: break;
    }
  }

  function handleNext(current) {
    switch (current) {
      case 'BASIC': navEndpoint.current.click(); break;
      case 'ENDPOINT': navAccess.current.click(); break;
      default: break;
    }
  };
//   const handleButtonClick = () => {
//     const section = document.getElementById('extra');
//     const basicButton = document.getElementById('nav-basic-tab');
//     const endpointButton = document.getElementById('nav-resource-tab');
//     const accessButton = document.getElementById('nav-contact-tab');


//     if (section) {
//       section.style.display = section.style.display === 'none' ? 'block' : 'none';
//       document.getElementById("next-btn").value = "Close Curtain";
//     }


//     // Toggle visibility of the Basic Information button
//     if (basicButton.style.display === 'none') {
//       basicButton.style.display = 'block';
//     } else {
//       basicButton.style.display = 'none';
//     }

//   };



  return (
    <main>
      <section id='upload' >
      <div className="container d-flex align-items-center justify-content-between">
          <div className='text-content'>
            <h1 className="fsxl48 font-mont fw-600 text-cc line-height">
              Upload your API
            </h1>
            <h5 className="fsxl24 fw-600 font-mont text-primary-2 py-2">
            Unleashing Healthcare Interoperability!
            </h5>
            <div className="font-lucida fsxl-l18 text-cc fw-400">
              <p>
              Elevate your healthcare API's reach with a <span style={{ color: "#F8B225" }}>FREE</span> listing on <span className="text-primary-2">APIdirect</span>,
                the world’s first healthcare API library.
              </p>
              <p>
              Join a thriving community of healthcare innovators and boost your API's visibility today!
              </p>
              <div className="why-api">
              <h3 className=' font-mont fw-600 text-cc line-height'>Why APIdirect?</h3>
              <li className='font-lucida fsxl-l18 text-cc fw-400'><span style={{ color: "#F8B225" }}>Rapid Processing</span>: Fill the Registration Form, and we'll have your listing live within 48 hours after verification.</li>
              <li className='font-lucida fsxl-l18 text-cc fw-400'><span style={{ color: "#F8B225" }}>Optional Advance Questions</span>: Submit basic details now and let us handle the advanced questions later. Or, dive in and complete the comprehensive form at your own pace.</li>
              </div>
            </div>
          </div>
          <div className="img-content">
            <div className='mt-auto w-100 mb-4'>
              <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/ReactApiImg/plug-bot.png" alt="Alphabot Plug" width="100%" />
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="title px-2 not-xl">
            <h5 className="fsxl24 font-mont fw-600 text-cc">
            Your Journey Starts Here:
            </h5>
            <br />
            <p className="font-lucida fsxl-l18 text-cc">
            Complete the Registration Form with<br/>
            essential information to kickstart your API's success.
            </p>
          </div>
          <div className="form-wrap">
            <div id='form-tabs'>
              <nav>
              <div className="title">
                  <h5 className="fsxl24 font-mont fw-600 text-cc">
                  Your Journey Starts Here:
                  </h5>
                  <br />
                  <p className="font-lucida fsxl-l18 text-cc">
                  Complete the Registration Form with<br/>
                   essential information to kickstart your API's success.
                  </p>
                </div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link fsxl24" id="nav-resource-tab" data-bs-toggle="tab" data-bs-target="#nav-resource"
                      type="button" role="tab" aria-controls="nav-resource" aria-selected="false" ref={navEndpoint} >
                      Endpoints &amp; Connectors
                    </button>
                    <button className="nav-link fsxl24" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                      type="button" role="tab" aria-controls="nav-contact" aria-selected="false" ref={navAccess} >
                      Accessibility
                    </button>
                  
                  <div className='text-cc xl-only'>
                    <div className="need-help" ref={helpRef}>
                      <div className='d-flex justify-content-between'>
                        <h6 className="fsxl-m16 font-mont fw-600 text-cc">
                          Need help?
                        </h6>
                        <svg className='svg' onClick={() => { helpRef.current.style.display = 'none' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <mask id="mask0_1662_8148" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_1662_8148)">
                            <path d="M5.33366 15.8332L4.16699 14.6665L8.83366 9.99984L4.16699 5.33317L5.33366 4.1665L10.0003 8.83317L14.667 4.1665L15.8337 5.33317L11.167 9.99984L15.8337 14.6665L14.667 15.8332L10.0003 11.1665L5.33366 15.8332Z" fill="white" />
                          </g>
                        </svg>

                      </div>
                      <p className="font-lucida fsxl-l14">
                        Don’t have all the information
                        to hand, or just need help?
                      </p>
                      <Link to="/contact-faq" className='contact'>
                        Contact us
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
               <div className="tab-pane fade show active" id="nav-resource" role="tabpanel" aria-labelledby="nav-resource-tab">
                  <div className='section-title'>
                    <h5 className="fsxl24 fw-600 font-mont text-cc">
                      API Resource/Endpoints
                    </h5>
                  </div>
                  <form onSubmit={handleResourceFormSubmit} className='d-flex flex-column'>
                    <div className="q-hold">
                      <label htmlFor="FHIR">Is the API FHIR compliant?</label>
                      <select name="fhirCompliant" className='form-control form-select' id="FHIR"
                        value={data.fhirCompliant} onChange={handleSelectChange}
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                    {
                      (data.fhirCompliant) ? <>
                        <div className='d-flex flex-wrap'>
                          {
                            Object.keys(resources).map((r, i) => {
                              return (
                                <div className="form-check col-12 col-md-6 col-lg-4" key={i}>
                                  <input className="form-check-input" type="checkbox" name={r}
                                    onChange={handleFhirResTitleChange}
                                    value={r} id={r + "CHECK"}
                                  />
                                  <label className="form-check-label" htmlFor={r + "CHECK"}>
                                    {r}
                                  </label>
                                </div>
                              )
                            })
                          }
                        </div>
                        {
                          fhirResTitle.map((t, i) => {
                            return <div key={i} className='resource-group' style={{ display: i === fhirResTitle.length - 1 ? 'block' : 'none' }} >
                              <div className="fsxl-m16 font-mont fw-600">FHIR Resource Group - {t}</div>
                              <div className="d-flex flex-wrap mb-2">
                                {
                                  resources[t].map((r, j) => {
                                    return (
                                      <div className="form-check mx-2" key={j}>
                                        <input className="form-check-input" type="checkbox" name={t}
                                          onChange={handleFhirResListChange}
                                          value={r} id={r + "CHECK"}
                                        />
                                        <label className="form-check-label fsxl-m14" htmlFor={r + "CHECK"}>
                                          {r}
                                        </label>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          })
                        }
                      </> :

                        <div className="q-hold">
                          <label htmlFor="list">
                            Please list any non-FHIR API endpoints available or may even
                            provide a link to documentation or list in the text box provided.
                          </label>
                          <textarea name="nonFhirEndpoints" className='form-control'
                            rows="3" placeholder='Type list here (comma separated)'
                            value={data.nonFhirEndpoints} onChange={handleInputChanges}
                          ></textarea>
                        </div>
                    }

                    <div className="d-flex w-100 justify-content-between">
                      <button className='form-btn back' onClick={() => handleBack('ENDPOINT')} >Back</button>
                      <button className='form-btn next' type='submit'>Next</button>
                    </div>
                  </form>
                </div>


                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <div className='section-title'>
                    <h5 className="fsxl24 fw-600 font-mont text-cc">
                      Accessibility
                    </h5>
                  </div>
                  <form onSubmit={handleAccessFormSubmit} className='d-flex flex-column rg-1'>
                    <div className="q-hold">
                      <label htmlFor="sandbox">Is a secured sandbox avaliable?</label>
                      <select name="sandbox" className='form-control form-select' id="sandbox"
                        value={data.sandbox} onChange={handleSelectChange}
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>

                    <div className="q-hold">
                      <label htmlFor="real-time">
                        Is the API connected to a database that is updated in real
                        time or are periodic updates scheduled
                        at your database level?
                      </label>
                      <div className="d-flex flex-wrap">
                        <div className="form-check w-50">
                          <input className="form-check-input" type="radio" name='databaseType'
                            onChange={handleInputChanges}
                            value="PERIODIC-SCHEDULED" id="PER_CHECK"
                          />
                          <label className="form-check-label" htmlFor="PER_CHECK">
                            Periodic/Scheduled
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="radio" name='databaseType'
                            onChange={handleInputChanges}
                            value="URL-ENCODED" id="OTH_CHECK"
                          />
                          <label className="form-check-label" htmlFor="OTH_CHECK">
                            Other (please specify)
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="radio" name='databaseType'
                            onChange={handleInputChanges}
                            value="XML" id="REAL_CHECK"
                          />
                          <label className="form-check-label" htmlFor="REAL_CHECK">
                            Real time
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="q-hold">
                      <label htmlFor="other">Please specify other:</label>
                      <textarea name="databaseType" className='form-control' rows="3"
                        value={data.databaseType} onChange={handleInputChanges}
                        placeholder='Type list here'
                      ></textarea>
                    </div>
                    <div className="q-hold">
                      <label htmlFor="sandbox">Is your API OPEN in public domain or works on a partnership basis?</label>
                      <select name="openApi" className='form-control form-select'
                        value={data.openApi} onChange={handleSelectChange}
                        id="sandbox"
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Open</option>
                        <option value={false}>Partner</option>
                      </select>
                    </div>
                    {
                      data.openApi === false ?
                        <div className="q-hold">
                          <label htmlFor="sandbox">Is pricing open to public or only to partners?</label>
                          <select name="openPricing" className='form-control form-select' id="sandbox"
                            value={data.openPricing} onChange={handleSelectChange}
                          >
                            <option value="">- Select -</option>
                            <option value={true}>Open</option>
                            <option value={false}>Partner</option>
                          </select>
                        </div>
                        : <></>
                    }
                    <div className="d-flex w-100 justify-content-between">
                      <button className='form-btn back' onClick={() => handleBack('ACCESS')} >Back</button>
                      <button className='form-btn next' type='submit'>Submit</button>
                    </div>
                  </form>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
