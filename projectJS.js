// Bradley Gatewood
// WEB 115 Final Project


var debug = true;  // Debug flag for testing.  Change to true to enable testing functionality.

main();


function main()
{
    // Add the name and course elements at the top of the document.
    var body = document.body;
    body.insertBefore(createNameElement(), body.childNodes[0]);
    body.insertBefore(createCourseElement(), body.childNodes[1]);

    // Add the event handler to the form's submit button.
    var theForm = document.getElementById("form1");
    theForm.btnCreateResume.addEventListener("click", createResume);

    if (debug)
    {
        mainDebug();
    }
}


// Add my name to the document with the following formatting:
// h1 header, red, Tahoma, centered
function createNameElement()
{
    var newElem = document.createElement("h1");
    newElem.style.color = "red";
    newElem.style.fontFamily = "Tahoma";
    newElem.style.textAlign = "center";

    var newText = document.createTextNode("Bradley Gatewood");
    newElem.appendChild(newText);

    return newElem;
}


// Add my course number and section number with the following formatting:
// h2 header, red, Garamond, italicized, centered
function createCourseElement()
{
    var newElem = document.createElement("h2");
    newElem.style.color = "red";
    newElem.style.fontFamily = "Garamond";
    newElem.style.fontStyle = "italic";
    newElem.style.textAlign = "center";

    var newText = document.createTextNode("WEB 115 - Section 0002");
    newElem.appendChild(newText);

    return newElem;
}


// Generate a new Web page displaying a resume based on the user input.
function createResume()
{
    if (!validateEmailAddress())
    {
        alert("Please enter a valid e-mail address.");
        return;
    }

    var theDoc = createResumeWindow(550, 850).document;

    theDoc.write("<html>");
    theDoc.write("<head>");

    writeResumeStyle(theDoc);

    theDoc.write("</head>");
    theDoc.write("<body>");

    writeResumeHeader(theDoc);
    writeResumeBody(theDoc);

    theDoc.write("</body>");
    theDoc.write("</html>");
}


// More validation code could be added to this function.
// e.g. Check if e-mail address ends in ".com", ".edu", etc.
function validateEmailAddress()
{
    var email = document.getElementById("form1").txtEmail.value;
    var valid = true;

    // Check if e-mail contains the "@" symbol after the first character.
    if (email.indexOf("@") < 1)
    {
        valid = false;
    }

    return valid;
}


// Create a new window of the specified size.
function createResumeWindow(height, width)
{
    var size = "height=" + height + ", width=" + width;
    return window.open("", "", size);
}


// Write the resume's css style to the html document's header.
function writeResumeStyle(theDoc)
{
    var fontSize = 12; // pt
    var fontFamily = "Lucida Console, Monaco, monospace";
    var leftMargin = 20; // %
    var bottomMargin = "10px";

    var styleStr = "<style>";
    styleStr += "body { ";
    styleStr += ("font-size:" + fontSize + "pt;");
    styleStr += ("font-family:" + fontFamily + ";");
    styleStr += " } ";
    styleStr += "#left { ";
    styleStr += ("float:left; width:" + (leftMargin - 2) + "%;");
    styleStr += ("margin-bottom:" + bottomMargin + ";");
    styleStr += " } ";
    styleStr += "#right { ";
    styleStr += ("margin-left:" + leftMargin + "%;");
    styleStr += ("margin-bottom:" + bottomMargin + ";");
    styleStr += " } ";
    styleStr += ".clear {"
    styleStr += "clear:both;";
    styleStr += " } "
    styleStr += "</style>";
    
    theDoc.write(styleStr);
}


// Write the user's name, address, phone number, and e-mail address
// followed by a horizontal rule.
function writeResumeHeader(theDoc)
{
    var theForm = document.getElementById("form1");

    var name = theForm.txtName.value;
    theDoc.write("<h3>" + name.toUpperCase() + "</h3>");

    var address = theForm.txtAddress.value;
    var phone = theForm.txtPhone.value;
    theDoc.write("<p>" + address + " / " + phone + "</p>");

    var email = theForm.txtEmail.value;
    theDoc.write("<p><b>" + email + "</b></p>");

    theDoc.write("<hr>");
}


// Write the resume's body to the html document.
function writeResumeBody(theDoc)
{
    var theForm = document.getElementById("form1");

    writeResumeSection(theDoc, "<b>CAREER OBJECTIVES</b>", formatInput(theForm.txtAreaCareer.value));
    writeResumeSection(theDoc, "<b>PERSONAL DATA</b>", formatInput(theForm.txtAreaPersonal.value));
    writeResumeSection(theDoc, "<b>EDUCATION</b>", formatInput(theForm.txtAreaEducation.value));

    writeResumeSection(theDoc, "<b>EMPLOYMENT EXPERIENCE</b>", "");
    writeEmploymentSections(theDoc);

    writeResumeSection(theDoc, "<b>CHARACTER REFERENCES</b>", "Upon Request");
    writeResumeSection(theDoc, "<b>BACKGROUND REFERENCES</b>", formatInput(theForm.txtAreaReferences.value));
}


// Print a section of the document in a two-column layout.
function writeResumeSection(theDoc, left, right)
{
    theDoc.write("<div id=\"left\">" + left + "</div>");
    theDoc.write("<div id=\"right\">" + right + "</div>");
    theDoc.write("<div class=\"clear\"></div>");
}


// Write the user's employment experience to the html document.
function writeEmploymentSections(theDoc)
{
    var prevJobs = document.getElementsByName("txtAreaEmployment");
    var startDates = document.getElementsByName("dateStart");
    var endDates = document.getElementsByName("dateEnd");

    for (var i = 0; i < prevJobs.length; i++)
    {
        if (!startDates[i].value) // If no start date entered, stop writing employment sections.
        {
            return;
        }

        var dateStr = getDateString(startDates[i].value, endDates[i].value);
        writeResumeSection(theDoc, dateStr, formatInput(prevJobs[i].value));
    }
}


// Format a textarea's input value to preserve new lines in the html output.
function formatInput(value)
{
    var lines = value.split("\n");
    var str = "";
    for (var i = 0; i < lines.length; i++)
    {
        str += lines[i] + "<br>";
    }
    return str;
}


// Return a string of dates in the following format: Month YYYY - Month YYYY
// Arguments should be passed in the following format: YYYY-MM-DD
function getDateString(start, end)
{
    var startMonth = start.charAt(5) + start.charAt(6);
    var startYear = start.substr(0, 4);
    var dateString = getMonthString(startMonth) + " " + startYear + " - ";

    if (end) // Add end date to string if necessary.
    {
        var endMonth = end.charAt(5) + end.charAt(6);
        var endYear = end.substr(0, 4);
        dateString += getMonthString(endMonth) + " " + endYear;
    }

    return dateString;
}


// "01" returns January, "02" returns February, etc.
function getMonthString(month)
{
    var months = ["Jan.", "Feb.", "March", "April", "May", "June",
                  "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    return months[parseInt(month) - 1];
}


// TESTING FUNCTIONS

function mainDebug()
{
    // Add the test email validation button to the document.
    var btnTestEmail = document.createElement("button");
    btnTestEmail.addEventListener("click", testValidateEmailAddress);
    btnTestEmail.appendChild(document.createTextNode("Check Email Address"));
    document.getElementById("p1").appendChild(btnTestEmail);

    // Add the auto-fill button to the end of the document.
    var btnTestCreateResume = document.createElement("button");
    btnTestCreateResume.addEventListener("click", testCreateResume);
    btnTestCreateResume.appendChild(document.createTextNode("Auto-Fill"));
    document.getElementById("buttons").appendChild(btnTestCreateResume);
}

// Event handler for email validation test button.
function testValidateEmailAddress(e)
{
    e.preventDefault();
    
    if (validateEmailAddress())
    {
        alert("E-mail address is VALID.");
    }
    else
    {
        alert("E-mail address is INVALID.");
    }
}

// Fill the form with my resume information for quick testing.
function testCreateResume(e)
{
    e.preventDefault();

    var theForm = document.getElementById("form1");

    theForm.txtName.value = "Bradley Taylor Gatewood";
    theForm.txtAddress.value = "3900 Knickerbocker Pkwy, Apt. H, Raleigh, NC, 27612";
    theForm.txtPhone.value = "(919) 999-7526";
    theForm.txtEmail.value = "btgatewood@outlook.com";
    theForm.txtAreaCareer.value = "Software Developer & Computer Programmer";

    theForm.txtAreaPersonal.value = "Birth Date: April 16, 1990\n";
    theForm.txtAreaPersonal.value += "Health: Excellent, 170 lbs / 5'9\"\n";
    theForm.txtAreaPersonal.value += "Marital Status: Single,\n";
    theForm.txtAreaPersonal.value += "Languages: English, Spanish";

    theForm.txtAreaEducation.value = "A.S. Computer Programming & Development - 2019\n";
    theForm.txtAreaEducation.value += "Wake Technical Community College,\n";
    theForm.txtAreaEducation.value += "Raleigh, North Carolina";

    var prevJobs = document.getElementsByName("txtAreaEmployment");
    var startDates = document.getElementsByName("dateStart");
    var endDates = document.getElementsByName("dateEnd");

    prevJobs[0].value = "Line Cook at Skylines Cafe in Clayton, NC\n";
    prevJobs[0].value += "Enter job description here...";
    startDates[0].value = "2018-03-01";

    prevJobs[1].value = "Line Cook at Kick Back Jack's in Garner, NC\n";
    prevJobs[1].value += "Enter job description here...";
    startDates[1].value = "2011-10-16";
    endDates[1].value = "2012-10-16";

    theForm.txtAreaReferences.value = "Kirby L. Winters, (XXX)XXX-XXXX\n"
    theForm.txtAreaReferences.value += "William B. Gatewood, Jr., (XXX)XXX-XXXX\n";
    theForm.txtAreaReferences.value += "Rhonda S. Gatewood, (XXX)XXX-XXXX";
}
