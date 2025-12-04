// 

"use client";
import React from 'react'
import styles from "./personalDetailePage2.module.css";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useContext } from "react";
// import OnSearchContext from "./context/OnSearchContext";
import OnSearchContext from '../Rysa/ONDC/context/OnSearchContext';
// import { Search } from "@/component/Rysa/ONDC/apis/search_formsubmit";
import {Search} from "../Rysa/ONDC/apis/search_formsubmit";
import UIDContext from '../Rysa/context/UIDContext';

function PersonalDetailePage2({ mainFormData = {}, setActiveContainer, setFormData }) {

    const { uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished} = useContext(UIDContext);

    const {
        formSubmissionData,
        setFormSubmissionData,
        payloadForSelect,
        setPayloadForSelect,
      } = useContext(OnSearchContext);

    const [loading, setLoading] = useState(false);//mast the screen or loader
    // Form field states - initialize with mainFormData values
    const [panNumber, setPanNumber] = useState(mainFormData?.panNumber || '');
    const [fullName, setFullName] = useState(mainFormData?.fullName || '');
    const [email, setEmail] = useState(mainFormData?.email || '');
    const [selectedGender, setSelectedGender] = useState(mainFormData?.selectedGender || '');
    const [selectedDate, setSelectedDate] = useState(mainFormData?.selectedDate || '');
    const genderMapping = {
        Male: 1,
        Female: 2,
        Other: 3,
    };
    const [formErrors, setFormErrors] = useState({
        panNumber: "",
        fullName: "",
        email: "",
        selectedGender: "",
        selectedDate: "",
    });


    // Error states for all fields
    const [panError, setPanError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');

    // DOB Date Picker States
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // CHANGE 1: Generate years array for dropdown (from 1950 to current year + 1)
    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        // for (let year = 1950; year <= currentYear + 1; year++) {
        //     years.push(year);
        // }
        for (let year = 1950; year <= 2050; year++) {
            years.push(year);
        }
        return years.reverse(); // Most recent years first
    };

    const years = generateYears();

    // Validation functions
    const validatePAN = (pan) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name) => {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    };

    const isValidDate = (dateString) => {
        const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
        const match = dateString.match(regex);
        if (!match) return false;

        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);

        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day &&
            year >= 1900 && year <= new Date().getFullYear();
    };

    // Field validation handlers
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'pan':
                if (!value.trim()) {
                    return 'PAN number is required';
                } else if (value.length !== 10) {
                    return 'PAN number must be 10 characters long';
                } else if (!validatePAN(value)) {
                    return 'Invalid PAN format. Should be 5 letters + 4 digits + 1 letter (e.g., HAGSF7384H)';
                }
                return '';

            case 'name':
                if (!value.trim()) {
                    return 'Name is required';
                } else if (!validateName(value)) {
                    return 'Please enter a valid name (only letters and spaces, minimum 2 characters)';
                }
                return '';

            case 'email':
                if (!value.trim()) {
                    return 'Email is required';
                } else if (!validateEmail(value)) {
                    return 'Please enter a valid email address';
                }
                return '';

            case 'gender':
                if (!value) {
                    return 'Please select your gender';
                }
                return '';

            // case 'dob':
            //     if (!value.trim()) {
            //         return 'Date of birth is required';
            //     } else if (!isValidDate(value)) {
            //         return 'Please enter a valid date in DD-MM-YYYY format';
            //     }
            case 'dob':
                if (!value.trim()) {
                    return 'Date of birth is required';
                } else if (!isValidDate(value)) {
                    return 'Please enter a valid date in DD-MM-YYYY format';
                } else {
                    const [day, month, year] = value.split('-').map(Number);
                    const dob = new Date(year, month - 1, day);
                    const today = new Date();

                    let age = today.getFullYear() - dob.getFullYear();
                    const monthDiff = today.getMonth() - dob.getMonth();
                    const dayDiff = today.getDate() - dob.getDate();

                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                        age--;
                    }

                    if (age < 18) {
                        return 'You must be at least 18 years old';
                    }
                }
                return '';

            default:
                return '';
        }
    };

    // Clear error when user starts typing/selecting
    const clearError = (fieldName) => {
        switch (fieldName) {
            case 'pan':
                setPanError('');
                break;
            case 'name':
                setNameError('');
                break;
            case 'email':
                setEmailError('');
                break;
            case 'gender':
                setGenderError('');
                break;
            case 'dob':
                setDobError('');
                break;
        }
    };

    // Form submission validation
    const validateAllFields = () => {
        const panErr = validateField('pan', panNumber);
        const nameErr = validateField('name', fullName);
        const emailErr = validateField('email', email);
        const genderErr = validateField('gender', selectedGender);
        const dobErr = validateField('dob', selectedDate);

        setPanError(panErr);
        setNameError(nameErr);
        setEmailError(emailErr);
        setGenderError(genderErr);
        setDobError(dobErr);

        return !panErr && !nameErr && !emailErr && !genderErr && !dobErr;
    };

    // PAN handling
    const formatPANInput = (value) => {
        let formatted = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (formatted.length > 10) {
            formatted = formatted.substring(0, 10);
        }
        return formatted;
    };

    const handlePANChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPANInput(inputValue);

        setPanNumber(formattedValue);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            panNumber: formattedValue
        }));
        clearError('pan');

        if (formattedValue.length === 10) {
            const error = validateField('pan', formattedValue);
            setPanError(error);
        }
    };

    const handlePANBlur = () => {
        const error = validateField('pan', panNumber);
        setPanError(error);
    };

    // Name handling
    const handleNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            fullName: value
        }));
        clearError('name');
    };

    const handleNameBlur = () => {
        const error = validateField('name', fullName);
        setNameError(error);
    };

    // Email handling
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            email: value
        }));
        clearError('email');
    };

    const handleEmailBlur = () => {
        const error = validateField('email', email);
        setEmailError(error);
    };

    // Gender handling
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedGender: gender,
            genderValue: genderMapping[gender] || null, // for backend
        }));
        clearError('gender');
    };

    // DOB Helper Functions
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const getPrevMonthDays = (month, year) => {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        return getDaysInMonth(prevMonth, prevYear);
    };

    const formatDateInput = (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 2) {
            return digits;
        } else if (digits.length <= 4) {
            return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        } else {
            return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
        }
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const prevMonthDays = getPrevMonthDays(currentMonth, currentYear);

        const days = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                isCurrentMonth: false,
                isPrevMonth: true
            });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true,
                isPrevMonth: false
            });
        }

        const remainingCells = 42 - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                isPrevMonth: false
            });
        }

        return days;
    };

    const handleDateClick = (day, isCurrentMonth) => {
        if (!isCurrentMonth) return;

        const formattedDate = `${String(day).padStart(2, '0')}-${String(currentMonth + 1).padStart(2, '0')}-${currentYear}`;
        setSelectedDate(formattedDate);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: formattedDate
        }));
        setShowDatePicker(false);
        clearError('dob');
    };

    const handleDateInputChange = (e) => {
        const formatted = formatDateInput(e.target.value);
        setSelectedDate(formatted);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: formatted
        }));
        clearError('dob');

        if (isValidDate(formatted)) {
            const [day, month, year] = formatted.split('-').map(Number);
            setCurrentMonth(month - 1);
            setCurrentYear(year);
        }
    };

    const handleDateBlur = () => {
        const error = validateField('dob', selectedDate);
        setDobError(error);
    };

    // CHANGE 2: Replace navigation functions with dropdown handlers
    const handleMonthChange = (e) => {
        setCurrentMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setCurrentYear(parseInt(e.target.value));
    };

    // FIXED: Enhanced handleToday function
    const handleToday = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth(); // 0-based (0 = January)
        const year = today.getFullYear();

        console.log('Today button clicked:', {
            day,
            month: month + 1, // Display month (1-based)
            year,
            currentMonth: month,
            currentYear: year
        });

        // Format the date string (DD-MM-YYYY)
        const formattedDate = `${String(day).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;

        // Update all states in the correct order
        setSelectedDate(formattedDate);
        setCurrentMonth(month); // Set to actual current month (0-based)
        setCurrentYear(year);   // Set to actual current year

        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: formattedDate
        }));

        // Clear any errors
        clearError('dob');
        setDobError('');

        // Close the date picker
        setShowDatePicker(false);

        console.log('States updated:', {
            selectedDate: formattedDate,
            currentMonth: month,
            currentYear: year
        });
    };

    const handleClear = () => {
        setSelectedDate('');
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: ''
        }));
        setShowDatePicker(false);
    };

    // FIXED: Enhanced isSelected function
    const isSelected = (day, isCurrentMonth) => {
        if (!isCurrentMonth || !selectedDate || !isValidDate(selectedDate)) return false;

        try {
            const [selectedDay, selectedMonth, selectedYear] = selectedDate.split('-').map(Number);
            const isMatch = selectedDay === day &&
                selectedMonth === (currentMonth + 1) &&
                selectedYear === currentYear;

            return isMatch;
        } catch (error) {
            console.error('Error in isSelected:', error);
            return false;
        }
    };

    // FIXED: Enhanced isToday function
    const isToday = (day, isCurrentMonth) => {
        if (!isCurrentMonth) return false;

        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth(); // 0-based
        const todayYear = today.getFullYear();

        const isTodayMatch = day === todayDay &&
            currentMonth === todayMonth &&
            currentYear === todayYear;

        return isTodayMatch;
    };

    // Handle next button click
    const handleNext = async () => {
        if (validateAllFields()) {
            try {
                setLoading(true);
                const payload = {
                    mobileNumber: mainFormData?.mobileNumber, // Page 1
                    pan: panNumber,
                    firstName: fullName, // backend will split it
                    email: email,
                    gender: mainFormData?.genderValue, //for backend we are sending integer value
                    dob: selectedDate,
                };

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page3`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
                        },
                    }
                );

                console.log("response of page 3 api is:", response);

                // Correct check
                if (response.data.status === "APPROVED") {
                    console.log("Data saved successfully");

                    // Split name
                    const nameParts = fullName.trim().split(" ");
                    let firstName = "";
                    let middleName = "";
                    let lastName = "";

                    if (nameParts.length === 1) {
                        firstName = nameParts[0];
                    } else if (nameParts.length === 2) {
                        firstName = nameParts[0];
                        lastName = nameParts[1];
                    } else if (nameParts.length >= 3) {
                        firstName = nameParts[0];
                        lastName = nameParts[nameParts.length - 1];
                        middleName = nameParts.slice(1, -1).join(" ");
                    }

                    // OTP API payload
                    const otpPayload = {
                        Mobilenumber: mainFormData?.mobileNumber,
                        firstname: firstName,
                        middlename: middleName,
                        lastname: lastName,
                        email: email,
                        pan: panNumber,
                    };

                    // Call OTP API
                    const otpResponse = await axios.post(
                        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/sendJourneyOTP`,
                        otpPayload,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                token: "Y3JlZGl0aGFhdHRlc3RzZXI=",
                            },
                        }
                    );

                    Search(setFormSubmissionData, formSubmissionData, mainFormData?.mobileNumber, uid, setUId);

                    console.log("OTP API response:", otpResponse.data);

                } else {
                    console.log("Failed to save data:", response.data);
                }

                // save bhi hoga + next page open bhi hoga
                setFormData((prev) => ({
                    ...prev,
                    panNumber,
                    fullName,
                    email,
                    selectedGender,
                    selectedDate,
                }));
                setActiveContainer("PersonalDetailePage3");

            } catch (error) {
                console.error("Error saving Page 3 data:", error);
                alert("Something went wrong while saving data");
            } finally {
                setLoading(false); // stop loading
            }
        }
    };


    const handleBack = () => {
        // // Save current data before going back
        // setFormData(prev => ({
        //     ...prev,
        //     panNumber: panNumber,
        //     fullName: fullName,
        //     email: email,
        //     selectedGender: selectedGender,
        //     selectedDate: selectedDate
        // }));
        setActiveContainer("PersonalDetailePage");
    };
    // scroll page top 
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className={styles.Block}>
            {loading && (
                <div className={styles.overlay}>
                    <div className={styles.spinner}></div>
                </div>
            )}
            <div className={styles.mainHeaderPart} >
                {/* mynew */}
                <div className={styles.topchildren}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="/AryseFin_logo.png"
                            width={80}
                            height={80}
                            className={styles.logo2}
                            alt="Aryse_Fin logo"
                            priority
                        />
                    </div>
                </div>


                {/* mynew */}
            </div>
            <div className={styles.mainForm}>
                <div className={styles.header}>
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.progressBarFill}></div>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.progressBarFill2}></div>
                        </div>
                        <div className={styles.progressBarlast}>
                            <div className={styles.stepNumberLast}>3</div>
                        </div>
                    </div>
                    {/* <div className={styles.headering}><h3>personal Details</h3></div> */}
                </div>

                <div className={styles.form}>
                    <div className={styles.formheading}>
                        Personal Details
                    </div>

                    {/* PAN No field with validation */}
                    <div className={`${styles.fields} ${panError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>PAN</span>
                        <input
                            type='text'
                            name='PAN'
                            className={styles.inputfield}
                            value={panNumber}
                            onChange={handlePANChange}
                            onBlur={handlePANBlur}
                            maxLength={10}
                        />
                    </div>

                    {/* Name as PAN field with validation */}
                    <div className={`${styles.fields} ${nameError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>Name as on PAN</span>
                        <input
                            type='text'
                            name='fullname'
                            className={styles.inputfield}
                            value={fullName}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                        />
                    </div>

                    {/* Email field with validation */}
                    <div className={`${styles.fields} ${emailError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}> Personal email</span>
                        <input
                            type='email'
                            name='Email'
                            className={styles.inputfield}
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                    </div>

                    {/* Gender field with validation */}
                    <div className={styles.fields1}>
                        <span className={styles.gendertitle} >Gender</span>

                        <div className={styles.genderContainer}>
                            <div
                                className={`${styles.genderOption} ${selectedGender === 'Male' ? styles.genderSelected : ''} ${genderError ? styles.genderOptionError : ''}`}
                                onClick={() => handleGenderSelect('Male')}
                            >
                                <div className={styles.genderIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#6039d2" />
                                        <path d="M12 14C8.67 14 2 15.67 2 19V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V19C22 15.67 15.33 14 12 14Z" fill="#6039d2" />
                                    </svg>
                                </div>
                                <span className={styles.genderText}>Male</span>
                            </div>
                            <div
                                className={`${styles.genderOption} ${selectedGender === 'Female' ? styles.genderSelected : ''} ${genderError ? styles.genderOptionError : ''}`}
                                onClick={() => handleGenderSelect('Female')}
                            >
                                <div className={styles.genderIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#6039d2" />
                                        <path d="M12 14C9.5 14 7.5 14.5 6 15.5C5.5 15.8 5.2 16.3 5.2 16.9V17.5C5.2 18.3 5.9 19 6.7 19H8.5L9.5 21H14.5L15.5 19H17.3C18.1 19 18.8 18.3 18.8 17.5V16.9C18.8 16.3 18.5 15.8 18 15.5C16.5 14.5 14.5 14 12 14Z" fill="#6039d2" />
                                    </svg>
                                </div>
                                <span className={styles.genderText}>Female</span>
                            </div>
                        </div>
                    </div>

                    {/* DOB field with validation */}
                    <div className={`${styles.fields} ${dobError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>DOB</span>
                        <div className={styles.dobInputContainer}>
                            <input
                                type='text'
                                name='dateOfBirth'
                                className={`${styles.inputfield} ${styles.dobInput}`}

                                value={selectedDate}
                                placeholder="DD-MM-YYYY"
                                onChange={handleDateInputChange}
                                onBlur={handleDateBlur}
                                maxLength={10}
                            // inputMode="numeric"
                            />
                            <button
                                type="button"
                                className={styles.calendarButton}
                                onClick={() => setShowDatePicker(!showDatePicker)}
                            >
                                📅
                            </button>
                        </div>
                    </div>

                    {/* Button part */}
                    <div className={styles.btn}>
                        <div className={styles.backbtn} onClick={handleBack}><span> Back </span></div>
                        <div className={styles.emptyspace}></div>
                        <div className={styles.nextbtn} onClick={handleNext}><span> Next </span></div>
                    </div>
                </div>

                {/* CHANGE 3: Updated Date Picker Modal with Dropdowns */}
                {showDatePicker && (
                    <div
                        className={styles.datePickerOverlay}
                        onClick={() => setShowDatePicker(false)}
                    >
                        <div
                            className={styles.datePickerModal}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.datePickerHeader}>
                                <div className={styles.monthYearSelector}>
                                    <div className={styles.monthSelector}>
                                        <select
                                            value={currentMonth}
                                            onChange={handleMonthChange}
                                            className={styles.monthDropdown}
                                        >
                                            {months.map((month, index) => (
                                                <option key={index} value={index}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.yearSelector}>
                                        <select
                                            value={currentYear}
                                            onChange={handleYearChange}
                                            className={styles.yearDropdown}
                                        >
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowDatePicker(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className={styles.weekdaysGrid}>
                                {weekdays.map(day => (
                                    <div key={day} className={styles.weekdayHeader}>{day}</div>
                                ))}
                            </div>

                            <div className={styles.calendarGrid}>
                                {generateCalendarDays().map((dateObj, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDateClick(dateObj.day, dateObj.isCurrentMonth)}
                                        disabled={!dateObj.isCurrentMonth}
                                        className={`${styles.calendarDay} ${!dateObj.isCurrentMonth ? styles.disabledDay : ''
                                            } ${isSelected(dateObj.day, dateObj.isCurrentMonth) ? styles.selectedDay : ''
                                            } ${isToday(dateObj.day, dateObj.isCurrentMonth) ? styles.todayDay : ''
                                            }`}
                                    >
                                        {dateObj.day}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.datePickerFooter}>
                                <button onClick={handleClear} className={styles.clearButton}>Clear</button>
                                <button onClick={handleToday} className={styles.todayButton}>Today</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalDetailePage2;