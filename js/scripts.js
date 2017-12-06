var availSCont =
  '<div class="%cat2%"><p class="description">%description%</p><div class="row"><div class="col-sm-2"><input type="checkbox" name="article_id" value="%article_id%" onclick="processRequest.call(%cat%, $(this), this);"></div><div class="col-sm-7 heading">%heading%</div><div class="col-sm-3 author">%author%</div></div></div>';
var chkdSCont =
  '<li><span class="close-diag close-diagA" onclick="removeRequestFromFault.call(%cat%, $(this), this); simulateClick(this.getAttribute(\'value\'), \'%cat2%\')"; value="%article_id%">&times;</span><span>%description%</span></li>';
var faultDisp =
  '<div class="fault-display col-sm-5" onclick="show_a_fault($(this));" id="%sid%"><div class="description">%description%</div><div class="row hAD"><div class="heading col-sm-8">%heading%</div><div class="col-sm-4"><div class="author">%author%</div><div class="hr"></div><div class="date">%date%</div></div></div></div>';
var aFault =
  '<header><h4 class="heading">%heading%<span class="close-diag close-diag2" onclick="hide_a_fault()">&times;</span></h4></header><section class="description"> %description%</section><section class="symptoms"> <h4>Symptoms</h4> <ul class="col-sm-11 col-sm-offset-1">%symptom% </ul></section><section class="solutions"> <h4>Solutions</h4> <ul class="col-sm-11 col-sm-offset-1">%solution% </ul></section><section class="publishInfo">This fault was added <span class="date">%date%</span> by <span class="author">%author%</span></section>';
var sympInAFault =
  ' <li><span class="symptom">%heading%: </span>%description%</li>';
var solnInAFault =
  ' <li><span class="solution">%heading%: </span>%description%</li>';

var sympToAdd = {},
  solnToAdd = {},
  sympAvail = {},
  solnAvail = {},
  faultAvail = {};
// var symptomsF = {
//     Testing: {
//         author: "Opeyemi David",
//         description: "Another",
//         heading: "Testing",
//         sid: "Testing",
//     },
//     TestingMore: {
//         author: "Opeyemi David",
//         description: "Another",
//         heading: "Testing More",
//         sid: "TestingMore"
//     },
//     Test: {
//         author: "Opeyemi David",
//         description: "T",
//         heading: "Test",
//         sid: "Test"
//     }
// };
// faultAvail.fault = {
//     sid: "fault",
//     heading: "The Look out of a fault in the faults of the fault software in the home.",
//     description: "This would be the description of the fault, as in this one would be the first one of the faults, you can try to write an epistle here if you love to, the basic thing is that it won't work, I don't mean my work won't work, of course everyone wants his work to work, because no one wants to waste his work.OBG",
//     symptoms: symptomsF,
//     creationDate: "2017-06-08:20:05:00",
//     updateDate: "2017-06-09:20:05:00",
//     date: "about a day ago",
//     author: "Opeyemi David"
// };

function generate_id(articles_array) {
  article_id = articles_array.split(' ');
  for (i = 0; i < article_id.length; i++) {
    a = article_id[i];
    a = a.replace(a.charAt(0), a.charAt(0).toUpperCase());
    article_id[i] = a;
  }
  article_id = article_id.join('');
  return article_id;
}

function articleO(heading) {
  this.heading = heading;
  this.sn = sn;
  this.sn = function() {};
  this.id = function() {
    this.id = this.heading.split(' ');
    for (i = 0; i < this.id.length; i++) {
      a = this.id[i];
      a = a.replace(a.charAt(0), a.charAt(0).toUpperCase());
      this.id[i] = a;
    }
    this.id = this.id.join('');
    this.id += this.sn;
  };
  this.symptoms = symptoms;
  this.solution = solution;
}

function filterOptions($input, cont) {
  var filter, $div, $cont, i, $p;
  filter = $input.value.toUpperCase();
  $cont = document.getElementById(cont);
  $div = $cont.children;
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < $div.length; i++) {
    var $p_auth, $p_heading, $p_val;
    $p = $div[i].children;
    $p_val = $p[0].innerHTML;
    $p_heading = $p[1].children[1].innerHTML;
    $p_auth = $p[1].children[2].innerHTML;
    //   return;
    if ($p_heading.toUpperCase().indexOf(filter) > -1) {
      $div[i].style.display = '';
    } else {
      if ($p_val.toUpperCase().indexOf(filter) > -1) {
        $div[i].style.display = '';
      } else {
        if ($p_auth.toUpperCase().indexOf(filter) > -1) {
          $div[i].style.display = '';
        } else {
          $div[i].style.display = 'none';
        }
      }
    }
  }
}

function closeDiag($closeEl, contClose) {
  var filter, $li, p, i;
  var $contClose = $('#' + contClose);
  $contClose.hide();
}

function createInput() {
  // var  = '<div id="searchDBMoreContainer"><button type="button "id="searchDBMoreBtn" style="float:right;">Show More</button> <div class="loader" style="float:right;"></div></div>';
  $(
    '<button type="button" id="searchDBMoreBtn" style="float:right;">Show More</button>'
  ).appendTo('main');
}

function resizeWindow() {
  var wholeH = innerHeight;
  var theWholeToolCont = document.getElementById('theWholeToolCont');
  var headH = $('#theWholeToolCont > header').outerHeight();
  var footH = $('#theWholeToolCont > footer').outerHeight();
  $('#theWholeTool').outerHeight(innerHeight - headH - footH);
  $('#nav-left').outerHeight(innerHeight - headH - footH - 2);
  $('#display-right').outerHeight(innerHeight - headH - footH - 3);
  var bodyH = $('#theWholeTool').outerHeight();
}

jQuery(document).ready(function($) {
  resizeWindow();

  getFaults();
  getRequests('gSymp');
  getRequests('gSoln');

  $('#sympIn').focus(function() {
    $('#availSymp').css('display', 'block');
    $('#sympInC').css('outline', '1px solid darkslateblue');
  });

  $('#solnIn').focus(function() {
    $('#availSoln').css('display', 'block');
    $('#solnInC').css('outline', '1px solid darkslateblue');
  });

  $('#sympIn').blur(function() {
    $('#sympInC').css('outline', '0px');
  });

  window.addEventListener('resize', function() {
    resizeWindow();
  });

  $('#searchDB').submit(function() {
    $('#searchDBInfo').hide();
    $('#searchDB .loader').css('display', 'inline-block');
    searchPosts(false);
    return false;
  });

  $('#nSympForm').submit(function() {
    $('#nSympForm .loader').show();
    addRequestToDB('nSympForm');
    return false;
  });

  $('#nSolnForm').submit(function() {
    $('#nSolnForm .loader').show();
    addRequestToDB('nSolnForm');
    return false;
  });

  $('#addFaultForm').submit(function() {
    $('#addFaultForm .loader').show();
    addFaultToDB();
    return false;
  });
});

function changeVar(x, y) {
  var vars = [];
  vars.push(y);
  vars.push(x);
  return vars;
}

function processDate(dateToProcess) {
  var differenceTotalSecs,
    differenceTimeMilliS,
    differenceDays,
    differenceHours,
    differenceMins,
    differenceSecs,
    countdownText,
    countdownText2;
  // 2017-01-26 20:22:26||0000-00-00 00:00:00|||
  // launchDate = new Date(2017, 01, 28, 23, 59, 00, 00);
  var dateToProcessP1 = dateToProcess.slice(0, 10);
  dateToProcessP1 = dateToProcessP1.replace(/-/g, ', ');
  var dateToProcessP2 = dateToProcess.slice(10);
  dateToProcessP2 = dateToProcessP2.replace(' ', ', ');
  dateToProcessP2 = dateToProcessP2.replace(/:/g, ', ');
  dateToProcessF1 = dateToProcessP1.concat(dateToProcessP2, ', 00, 00');
  arrD = dateToProcessF1.split(', ');
  var newMonth = Number(arrD[1]);
  newMonth = --newMonth;
  if (newMonth < 10) {
    newMonth = '0' + newMonth;
  }
  dateToProcessF2 = new Date(
    arrD[0],
    newMonth,
    arrD[2],
    arrD[3],
    arrD[4],
    arrD[5],
    arrD[6]
  );
  var todayDate = new Date();
  differenceTimeMilliS = todayDate - dateToProcessF2;
  differenceTotalSecs = Math.floor(differenceTimeMilliS / 1000);
  differenceDays = Math.floor(differenceTotalSecs / 86400);
  differenceHours = Math.floor((differenceTotalSecs % 86400) / 3600);
  differenceMins = Math.floor(((differenceTotalSecs % 86400) % 3600) / 60);
  differenceSecs = Math.floor(((differenceTotalSecs % 86400) % 3600) % 60);
  if (differenceDays < 30) {
    if (differenceMins === 0 && differenceHours === 0 && differenceDays === 0) {
      return 'not up to a minute ago';
    } else if (differenceHours === 0 && differenceDays === 0) {
      if (differenceMins == 1) {
        return 'about a minute ago';
      } else if (differenceMins > 1) {
        return 'about ' + differenceMins + ' minutes ago';
      }
    } else if (differenceDays === 0) {
      if (differenceHours == 1) {
        return 'about an hour ago';
      } else if (differenceHours > 1) {
        return 'about ' + differenceHours + ' hours ago';
      }
    } else {
      if (differenceDays == 1) {
        return 'about a day ago';
      } else {
        return 'about ' + differenceDays + ' days ago';
      }
    }
  } else if (differenceDays < 365) {
    var differenceMonths = Math.floor(differenceDays / 30);
    if (differenceMonths == 1) {
      return 'about a month ago';
    } else if (differenceMonths > 1) {
      return 'about ' + differenceMonths + ' months ago';
    }
  } else {
    var differenceYear = Math.floor(differenceDays / 365);
    if (differenceYear == 1) {
      return 'about a year ago';
    } else if (differenceDays > 365) {
      return 'about ' + differenceYear + ' years ago';
    }
  }
}

function str_to_obj(con, propSep, propValSep) {
  /**
   * The first parameter is the string to convert to object.
   * The second paremeter is what seperates each object properties.
   * The third parameter is what seperates the properties and their values.
   */
  // "con" is the string to convert to object.
  //  "propSep" is what seperates each object properties.
  //  "propValSep" is what seperates the properties and their values.
  var newObj = {};
  var arr = con.split(propSep);
  for (j = 0; j < arr.length; j++) {
    if (arr[j] !== '' || arr[i] !== null) {
      var splitLoc = arr[j].indexOf(propValSep);
      var leftLoc = arr[j].slice(0, splitLoc);
      // make sure the first letter is lower toUpperCase
      var tempLeftLoc = leftLoc.charAt(0);
      leftLoc = leftLoc.replace(tempLeftLoc, tempLeftLoc.toLowerCase());
      var rightLoc = arr[j].slice(splitLoc + propValSep.length);
      newObj[leftLoc] = rightLoc;
    }
  }
  return newObj;
}

function clearInput(inputToClear) {
  $().each(function(inputToClear) {
    $(this).val('');
  });
}

function getFaults() {
  $.post($('#addFaultForm').attr('action'), { formID: 'getFaults' }, function(
    info
  ) {
    // console.log("info: " + info);
    info = correctApos(info, true);
    // console.log("info: " + info);
    // if ((info.includes("0 results")) >= 0 || (info.includes("error"))) {
    //     // showInfo.html("There was an error loading the faults. Please refresh the page or try again later.");
    //     // showInfo.show();
    // } else {
    var arrs = info.split('|||');
    // // console.log(' arrs: ' + arrs);
    for (i = 0; i < arrs.length; i++) {
      if (arrs[i] !== '') {
        var postQueryOne = arrs[i];
        var postObj = str_to_obj(postQueryOne, '||', '|:|');
        postObj.date = processDate('' + postObj.creationDate);
        // // console.log(postObj);
        var sid = postObj.sid;
        // // console.log(' sid: ' + sid);
        faultAvail[sid] = postObj;

        var _faultDisp = faultDisp.replace('%heading%', postObj.heading);
        _faultDisp = _faultDisp.replace('%description%', postObj.description);
        _faultDisp = _faultDisp.replace('%date%', postObj.date);
        _faultDisp = _faultDisp.replace('%author%', postObj.author);
        _faultDisp = _faultDisp.replace('%sid%', postObj.sid);

        $('#faults-container').append(_faultDisp);
      }
    }
  });
}

function getRequests(formID) {
  var text = '',
    location = '',
    cat = '',
    cat2 = '';
  if (formID === 'gSymp') {
    text =
      'No symptom has been added yet, use the add symtom below to add one.';
    location = '#availSymp';
    cat = 'sympToAdd';
    cat2 = 'availSymp';
  } else if (formID === 'gSoln') {
    text =
      'No solution has been added yet, use the add solution below to add one.';
    location = '#availSoln';
    cat = 'solnToAdd';
    cat2 = 'availSoln';
  }
  $.post(
    'php/scripts.php',
    {
      formID: formID
    },
    function(info) {
      if (info.search('0 results') >= 0) {
        location.html(text);
      } else {
        // info = correctApos(info, true);
        var arrs = info.split('|||');
        for (i = 0; i < arrs.length; i++) {
          if (arrs[i] !== '') {
            var postQueryOne = arrs[i];
            var postObj = str_to_obj(postQueryOne, '||', '|:|');
            if (formID === 'gSymp') {
              sympAvail[postObj.sid] = postObj;
            } else if (formID === 'gSoln') {
              solnAvail[postObj.sid] = postObj;
            }
            var availSContF;
            availSContF = availSCont.replace(
              '%description%',
              postObj.description
            );
            availSContF = availSContF.replace('%heading%', postObj.heading);
            availSContF = availSContF.replace('%author%', postObj.author);
            availSContF = availSContF.replace('%article_id%', postObj.sid);
            availSContF = availSContF.replace('%cat%', cat);
            availSContF = availSContF.replace('%cat2%', cat2);
            if (i > 0) {
              $(location).append(availSContF);
            } else {
              $(location).html(availSContF);
            }
          }
        }
      }
    }
  );
}

function toScreen() {
  // console.log('The button has been clicked.');
}

function addRequestToDB(formID) {
  var heading = '',
    formIDD = '',
    description = '',
    author = '',
    article_id = '',
    availObj = {},
    showInfo = {};
  if (formID === 'nSympForm') {
    availObj = sympAvail;
  } else if (formID === 'nSolnForm') {
    availObj = solnAvail;
  }
  heading = $('#' + formID + " [name='heading']").val();
  // heading = correctApos(heading, false);
  // // console.log("heading: " + heading);
  formIDD = $('#' + formID + " [name='formID']").val();
  // // console.log("formIDD: " + formIDD);
  description = $('#' + formID + " [name='description']").val();
  description = correctApos(description, false);
  // // console.log("description: " + description);
  author = $('#' + formID + " [name='author']").val();
  // // console.log("autohr: " + author);
  article_id = generate_id(heading);
  // // console.log('article_id: ' + article_id);
  showInfo = $('#' + formID + 'Info');
  if (checkRequest(article_id, availObj)) {
    showInfo.addClass('errorClass');
    showInfo.html('The request already exists.');
    showInfo.show();
    $('#' + formID + ' .loader').hide();
    return;
  }
  // var dateToProcess = $("#" + formID).serializeArray();
  // // console.log(dateToProcess);
  // return dateToProcess;
  $.post(
    $('#' + formID).attr('action'),
    {
      formID: formIDD,
      heading: heading,
      description: description,
      author: author,
      article_id: article_id
    },
    function(info) {
      // console.log("info: " + info);
      // return;
      $('#' + formID + ' .loader').hide();
      //   // console.log('info: ' + info);
      if (info.includes('Successful')) {
        showInfo.removeClass('errorClass');
        // showInfo.html(info);
        showInfo.html('Your request was successfully submitted');
        showInfo.show();
        // clearInput("#" + formID + " input:not(input[type='hidden'])");
        $(
          '#' +
            formID +
            " input:not(input[type='hidden']):not(input[type='submit'])"
        ).each(function() {
          $(this).val('');
        });
        $('#' + formID + ' textarea').val('');
        if (formID === 'nSympForm') {
          getRequests('gSymp');
        } else if (formID === 'nSolnForm') {
          getRequests('gSoln');
        }
      } else {
        showInfo.addClass('errorClass');
        showInfo.html('There was an error submitting your request.');
        showInfo.show();
      }
    }
  );
}

function processRequest(jqThis, jsThis) {
  var cat = '';
  if (this === sympToAdd) {
    cat = 'sSymp';
  } else if (this === solnToAdd) {
    cat = 'sSoln';
  }
  if (jsThis.checked) {
    addRequestToFault.call(this, jqThis, jsThis);
  } else {
    removeRequestFromFault.call(this, jqThis, jsThis);
  }
  showRequestInFault(cat);
}

function addRequestToFault(jqThis, jsThis) {
  var obj = {},
    obj_to_check = {};
  if (this === sympToAdd) {
    obj_to_check = sympAvail;
  } else if (this === solnToAdd) {
    obj_to_check = solnAvail;
  }
  if (this.hasOwnProperty(jqThis.val()) === false) {
    obj = obj_to_check[jqThis.val()];
    this[jqThis.val()] = obj;
  }
  showRequestStatus.call(this, jqThis.val());
}

function removeRequestFromFault(jqThis, jsThis) {
  var cat = '';
  if (this === sympToAdd) {
    cat = 'sSymp';
  } else if (this === solnToAdd) {
    cat = 'sSoln';
  }
  var val = jsThis.getAttribute('value');
  if (this.hasOwnProperty(val) === true) {
    delete this[val];
  }
  showRequestStatus.call(this, val);
  showRequestInFault(cat);
}

function showRequestStatus(id) {
  var cat = '';
  if (this === sympToAdd) {
    cat = 'availSymp';
  } else if (this === solnToAdd) {
    cat = 'availSoln';
  }
  if (this.hasOwnProperty(id)) {
    $('#' + cat + ' .' + cat + ":has(input[value='" + id + "'])").addClass(
      'checked'
    );
  } else {
    $('#' + cat + ' .' + cat)
      .has("input[value='" + id + "']")
      .removeClass('checked');
  }
}

function simulateClick(id, cat2) {
  $('#' + cat2 + " input[value='" + id + "']").click();
}

function showRequestInFault(formID) {
  var text = '',
    location = '',
    obj = {},
    h = 0,
    cat = '';
  if (formID === 'sSymp') {
    text =
      'No symptom has been selected yet, use the search symptom above to add one.';
    location = '#chkdSymp';
    obj = sympToAdd;
    cat = 'sympToAdd';
    cat2 = 'availSymp';
  } else if (formID === 'sSoln') {
    text =
      'No solution has been selected yet, use the search solution above to add one.';
    location = '#chkdSoln';
    obj = solnToAdd;
    cat = 'solnToAdd';
    cat2 = 'availSoln';
  }
  $(location).text('');
  for (var ke in obj) {
    h++;
    var objKe = obj[ke];
    var chkdSContT = chkdSCont.replace('%description%', objKe.description);
    chkdSContT = chkdSContT.replace('%article_id%', objKe.sid);
    chkdSContT = chkdSContT.replace('%cat%', cat);
    chkdSContT = chkdSContT.replace('%cat2%', cat2);
    $(location).append(chkdSContT);
  }
  if (h === 0) {
    $(location).text(text);
  }
}

function correctApos(str, reverse) {
  if (reverse) {
    str = str.replace(/&#39;/g, "'");
    str = str.replace(/&amp;#39;/g, "'");
    return str;
  } else {
    str = str.replace(/'/g, '&#39;');
    return str;
  }
}

function checkRequest(id, avail) {
  if (avail.hasOwnProperty(id)) {
    return true;
  } else {
    return false;
  }
}

function addFaultToDB() {
  var heading = '',
    description = '',
    author = '',
    article_id = '',
    symptoms = '',
    solutions = '',
    showInfo = {},
    arr = [];

  heading = $("#addFaultForm [name='heading']").val();
  heading = correctApos(heading, false);
  // // console.log("heading: " + heading);
  formIDD = $("#addFaultForm [name='formID']").val();
  // // console.log("formIDD: " + formIDD);
  description = $("#addFaultForm [name='description']").val();
  description = correctApos(description, false);
  // // console.log("description: " + description);
  author = $("#addFaultForm [name='author']").val();
  // // console.log("autohr: " + author);
  article_id = generate_id(heading);
  showInfo = $('#addFaultFormInfo');
  if (checkRequest(article_id, faultAvail)) {
    showInfo.addClass('errorClass');
    showInfo.html('The request already exists.');
    showInfo.show();
  }
  arr = obj_2_array(sympToAdd);
  symptoms = arr.join(', ');
  // // console.log("symptoms: " + symptoms);
  arr = obj_2_array(solnToAdd);
  solutions = arr.join(', ');
  // // console.log("solutions: " + solutions);

  $.post(
    $('#addFaultForm').attr('action'),
    {
      formID: formIDD,
      heading: heading,
      description: description,
      author: author,
      article_id: article_id,
      symptoms: symptoms,
      solutions: solutions
    },
    function(info) {
      // // console.log('info: ' + info);
      // return;
      $('#addFaultForm .loader').hide();
      //   // console.log('info: ' + info);
      if (info.includes('Successful')) {
        showInfo.removeClass('errorClass');
        // showInfo.html(info);
        showInfo.html('The fault was successfully submitted');
        showInfo.show();
        clearInput("#addFaultForm input:not(input[type='hidden'])");
        getFaults();
      } else {
        showInfo.addClass('errorClass');
        showInfo.html('There was an error submitting the fault.');
        showInfo.show();
      }
    }
  );
}

function obj_2_array(obj) {
  var arr = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      // var element = obj[k];
      arr.push(k);
    }
  }
  return arr;
}

function arr_2_obj(arr, obj) {
  var nObj = {};
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    if (obj.hasOwnProperty(el)) {
      nObj[el] = obj[el];
    }
  }
  return nObj;
}

function navMenuFunction(x) {
  x.classList.toggle('changeBar');
  $('#nav-left').slideToggle();
}

function reformRequest(s) {
  var obj = {},
    obj2 = {},
    obj_to_check = {};
  if (this === sympAvail) {
    obj_to_check = sympAvail;
  } else if (this === solnAvail) {
    obj_to_check = solnAvail;
  }

  // split so that we can iterate
  s = s.split(', ');

  for (var i = 0; i < s.length; i++) {
    var el = s[i];
    obj = obj_to_check[el];
    obj2[el] = obj;
  }
  return obj2;
}

function show_a_fault(jqThis) {
  'use-strict';
  /* $("#faults-container").slideUp("slow");
     $("#a_Fault").fadeIn("slow");*/
  var pObj = get_obj(jqThis);
  // console.log(pObj);
  var _aFault = aFault.replace('%heading%', pObj.heading);
  _aFault = _aFault.replace('%description%', pObj.description);
  _aFault = _aFault.replace(
    '%symptom%',
    gen_cat(pObj.symptoms, sympAvail, sympInAFault)
  );
  _aFault = _aFault.replace(
    '%solution%',
    gen_cat(pObj.solutions, solnAvail, solnInAFault)
  );
  _aFault = _aFault.replace('%date%', pObj.date);
  _aFault = _aFault.replace('%author%', pObj.author);
  $('#a_Fault').html(_aFault);
  $('#faults-container').slideUp('slow');
  $('#a_Fault').fadeIn('slow');
  // $("#faults-container").css("display", "");
  // $("#a_Fault").css("display", "");

  function get_obj(jqThis) {
    var obj = {};
    var id = jqThis.attr('id');
    // // console.log(' id: ' + id);
    if (faultAvail.hasOwnProperty(id)) {
      obj = faultAvail[id];
      return obj;
    }
  }

  function gen_cat(prop, cat, template) {
    var str = '';
    var arr = prop.split(', ');
    // console.log(arr);
    // console.log(cat);
    for (var i = 0; i < arr.length; i++) {
      var id = arr[i];
      var obj = cat[id];
      // console.log(obj);
      var _str = template.replace('%heading%', obj.heading);
      _str = _str.replace('%description%', obj.description);
      str += _str;
    }
    return str;
  }
}

function hide_a_fault() {
  $('#a_Fault').fadeOut('slow');
  $('#faults-container').slideDown('slow');
}

function hideOtherElements() {
  $("#nav-left-lists a[href='#addFaultTab'").fadeOut('slow');
  $('#logoutBtn').slideUp(300);
}

function showOtherElements() {
  $("#nav-left-lists a[href='#addFaultTab'").fadeIn('slow');
  $('#logoutBtn').slideDown(300);
}

function hideLoginElements() {
  $('#loginContainer').slideUp(300);
}

function showLoginElements() {
  $('#loginContainer').slideDown(300);
}

function log_in() {
  var userName = $('#loginUsernameVal').val();
  var passWord = $('#loginPasswordVal').val();
  // // console.log(userName);
  // // console.log(passWord);
  clearInput($('#loginContainer input'));
  if (userName == 'Admin' && passWord == 'admin') {
    hideLoginElements();
    showOtherElements();
    $('#loginContainer #loginHelpInfo').hide();
  } else {
    $('#loginContainer #loginHelpInfo').show();
  }
}

function log_out() {
  hideOtherElements();
  showLoginElements();
}
