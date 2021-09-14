app.controller("report", function ($scope, myService)
{

    $scope.listMain = [];
    $scope.list = [];
    $scope.listSub = [];
    $scope.LoadBasic = function ()
    {
        var feeType = {};
        var Path = "/Report/LoadBasicData";
        var getData3 = myService.UserLogin(feeType, Path);
        getData3.then(function success(d)
        {
            $scope.list = d.data.list;
            $scope.listSub = d.data.listSub;
           
        }, function error(d)
        {
            console.log("Error in Report -> LoadBasicData Function");
        });
    }
    $scope.LoadBasic();
    $scope.mlist = [];

    $scope.fType = "Summarized";
    $scope.search = function ()
    {
        $("#load").show();
        var feeType = {
            P1: $("#sec").val(),
            P2: $("#myfrom").val(),
            P3: $("#myto").val(),
            P4: $scope.withReg
        };
        var Path = "/Report/SearchDailyAttendaceSection";
        var getData3 = myService.UserLogin(feeType, Path);
        getData3.then(function success(d)
        {
            $scope.mlist = d.data.ml;
            $scope.listMain = angular.copy($scope.mlist);
            $("#load").hide();


        }, function error(d)
        {
            console.log("Error in Attendance -> SearchDailyAttendaceSection Function");
        });
    }

    $scope.getAttendance = function (code, roll)
    {
        var subCode = code.split('#')[0];
        var type = code.split('#')[1];
        var attValue = 0;
        var bgClass = "";
        var dd = $scope.mlist.filter(r=>r.Subject === subCode && r.Roll_No == roll);
        if (dd.length == 0)
        {
            return 0 + "#" + bgClass;
        } else if (type == "Held")
        {
            attValue = dd[0].Held;
            bgClass = dd[0].HeldClass;
        }
        else if (type == "Attend")
        {
            attValue = dd[0].Attend;
            bgClass = dd[0].AttendClass;
        }
        else if (type == "%Age")
        {
            attValue = dd[0].Per;
            bgClass = dd[0].PerClass;
        }
        return attValue + "#" + bgClass;
    }

    $scope.GetSubjectHeader = function ()
    {
        var Modes;
        if ($scope.fType == "Summarized")
            Modes = ["%Age"];
        else
            Modes = ["Held", "Attend", "%Age"];

        var Result = new Array();

        const categories = [...new Set($scope.mlist.map(Result => Result.Subject))];
        for (i = 0; i < categories.length; i++)
        {
            for (c = 0; c < Modes.length; c++)
            {
                Result.push(categories[i] + "#" + Modes[c]);
            }
        }
        return Result;
    }
    $scope.GetTotalPerAge = function (roll)
    {
        var tSub = 0;
        var tPer = 0;
        var dd = $scope.mlist.filter(r=> r.Roll_No == roll);
        if (dd.length > 0)
        {
            angular.forEach(dd, function (value, key)
            {
                tSub = parseInt(tSub) + 1;
                tPer = parseFloat(tPer) + parseFloat(value.Per);
            });
        }
        return tPer / tSub;
    }

    //Filter
    $scope.fattend = "=";
    $scope.fheld = "=";
    $scope.fper = "=";
    $scope.name = "";
    $scope.highlight = function ()
    {
        $scope.mlist = angular.copy($scope.listMain);
        angular.forEach($scope.mlist, function (value, key)
        {
            if ($scope.per != "" && $scope.per != undefined)
            {
                if ($scope.fper == "=")
                {
                    if (parseInt(value.Per) == parseInt($scope.per))
                    {
                        value.PerClass = 1;
                    }
                } else if ($scope.fper == ">")
                {
                    if (parseInt(value.Per) > parseInt($scope.per))
                    {
                        value.PerClass = 1;
                    }
                } else if ($scope.fper == ">=")
                {
                    if (parseInt(value.Per) >= parseInt($scope.per))
                    {
                        value.PerClass = 1;
                    }
                } else if ($scope.fper == "<")
                {
                    if (parseInt(value.Per) < parseInt($scope.per))
                    {
                        value.PerClass = 1;
                    }
                } else if ($scope.fper == "<=")
                {
                    if (parseInt(value.Per) <= parseInt($scope.per))
                    {
                        value.PerClass = 1;
                    }
                }
            }
           
        });
    }
    $scope.filterList = function ()
    {
        $scope.mlist = angular.copy($scope.listMain);
        if ($scope.held != "" && $scope.held != undefined)
        {
            switch ($scope.fheld)
            {
                case "=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Held) == parseInt($scope.held)));
                    break;

                case ">": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Held) > parseInt($scope.held)));
                    break;

                case "<": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Held) < parseInt($scope.held)));
                    break;

                case ">=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Held) >= parseInt($scope.held)));
                    break;

                case "<=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Held) <= parseInt($scope.held)));
                    break;
            }
        }

        if ($scope.attend != "" && $scope.attend != undefined)
        {
            switch ($scope.fattend)
            {
                case "=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Attend) == parseInt($scope.attend)));
                    break;

                case ">": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Attend) > parseInt($scope.attend)));
                    break;

                case "<": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Attend) < parseInt($scope.attend)));
                    break;

                case ">=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Attend) >= parseInt($scope.attend)));
                    break;

                case "<=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Attend) <= parseInt($scope.attend)));
                    break;
            }
        }
        if ($scope.per != "" && $scope.per != undefined)
        {
            switch ($scope.fper)
            {
                case "=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Per) == parseInt($scope.per)));
                    break;

                case ">": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Per) > parseInt($scope.per)));
                    break;

                case "<": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Per) < parseInt($scope.per)));
                    break;

                case ">=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Per) >= parseInt($scope.per)));
                    break;

                case "<=": $scope.mlist = angular.copy($scope.mlist.filter(Result => parseInt(Result.Per) <= parseInt($scope.per)));
                    break;
            }

        }
        if ($scope.name != '' && $scope.name != undefined)
        {
            $scope.mlist = angular.copy($scope.mlist.filter(Result => ($scope.name == '' || Result.Name == $scope.name)));
        }

    }
    $scope.reset = function ()
    {
        $scope.fattend = "=";
        $scope.fheld = "=";
        $scope.fper = "=";
        $scope.attend = "";
        $scope.held = "";
        $scope.per = "";
        $scope.name = "";
        $scope.mlist = angular.copy($scope.listMain);
    }

    //Subject Report
    $scope.fTypeSub = "Summarized";
    $scope.sublist = [];
    $scope.sublistMain = [];
    $scope.subHeader = [];
    $scope.TAP = [];
    $scope.fperSub = "=";
    $scope.withRegSub="1";
    $scope.searchSubject = function ()
    {
        $("#loadSub").show();
        var feeType = {
            P1: $("#secSub").val(),
            P2: $("#myfromSub").val(),
            P3: $("#mytoSub").val(),
            P4: $scope.withRegSub
        };
        var Path = "/Report/SubjectWiseReport";
        var getData3 = myService.UserLogin(feeType, Path);
        getData3.then(function success(d)
        {
            $scope.sublist = d.data.list;
            $scope.sublistMain = angular.copy(d.data.list);
            $scope.subHeader = d.data.header;
            $scope.TAP = d.data.tap;
            $("#loadSub").hide();

        }, function error(d)
        {
            console.log("Error in Attendance -> SubjectWiseReport Function");
        });
    }
    $scope.getSubjectAttendance = function (det,rollno)
    {
        var ldate = det.split('#')[2];
        var type = det.split('#')[3];
        
        var ls = $scope.sublist.filter(r=>r.Type == type && r.LectureDate == ldate && r.Roll == rollno);
        if (ls.length == 0)
        {
            return "L";
        }
        else
        {
            if ($scope.withRegSub == "1")
            {
                return ls[0].Status;
            } else
            {
                return ls[0].StatusOther;
            }
        }
    }
    $scope.calculateAttendLecture = function (roll,index)
    {
        var total = 0;
        var attend=0;
        var perAge = 0;
        //angular.forEach($scope.sublist, function (value, key)
        //{
        //    if (value.Roll == roll)
        //    {
        //        if (value.Status == "P" || value.Status == "A")
        //        {
        //            total = parseInt(total) + 1;
        //        }
        //        if (value.Status == "P")
        //        {
        //            attend = parseInt(attend) + 1;
        //        }
        //    }
        //});
        //perAge = (attend / total) * 100;

        var getstudentrecord = $scope.TAP.filter(r=>r.RollNo == roll);
        if ($scope.withRegSub == "1")
        {
            total = getstudentrecord[0].StatusTotal;
            attend = getstudentrecord[0].StatusAttend;
            perAge = getstudentrecord[0].StatusPer;
        } else
        {
            total = getstudentrecord[0].StatusOtherTotal;
            attend = getstudentrecord[0].StatusOtherAttend;
            perAge = getstudentrecord[0].StatusOtherPer;
        }

        return total+"#"+attend+"#"+perAge;
    }
    $scope.filterSubjectReport = function ()
    {
        $scope.sublist = angular.copy($scope.sublistMain);
        var tempTAP = angular.copy($scope.TAP);
        if ($scope.perSub != "" && $scope.perSub != undefined)
        {
            if ($scope.withRegSub == "1")
            {
                switch ($scope.fperSub)
                {
                    case "=": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusPer) == parseInt($scope.perSub)));
                        break;

                    case ">": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusPer) > parseInt($scope.perSub)));
                        break;

                    case "<": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusPer) < parseInt($scope.perSub)));
                        break;

                    case ">=": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusPer) >= parseInt($scope.perSub)));
                        break;

                    case "<=": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusPer) <= parseInt($scope.perSub)));
                        break;
                }
            }
            else
            {
                switch ($scope.fperSub)
                {
                    case "=": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusOtherPer) == parseInt($scope.perSub)));
                        break;

                    case ">": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusOtherPer) > parseInt($scope.perSub)));
                        break;

                    case "<": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusOtherPer) < parseInt($scope.perSub)));
                        break;

                    case ">=": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusOtherPer) >= parseInt($scope.perSub)));
                        break;

                    case "<=": tempTAP = angular.copy($scope.TAP.filter(Result => parseInt(Result.StatusOtherPer) <= parseInt($scope.perSub)));
                        break;
                }
            }

        }
       var RefList=[];
        if (tempTAP.length > 0)
        {
            RefList = tempTAP.map(x => x.RollNo);
        }
        
        if ($scope.nameSub != '' && $scope.nameSub != undefined)
        {
            $scope.sublist = angular.copy($scope.sublist.filter(Result => ($scope.nameSub == '' || Result.Name == $scope.nameSub)));
        }
        if (RefList.length > 0)
        {
            $scope.sublist = angular.copy($scope.sublist.filter(Result => (RefList.indexOf(Result.Roll) >= 0)));
        }
    }
    $scope.resetSubject = function ()
    {
        $scope.sublist = angular.copy($scope.sublistMain);
    }
});

var dt = new Date();
//$('#datepickerfrom1').datepicker({
//    autoclose: true,
//    todayHighlight: true,
//    endDate:dt.getFullYear()+"-"+dt.getMonth()-1+"-"+dt.getDay(),
//});

var start = dt.getFullYear() + "-" + dt.getMonth() - 1 + "-" + dt.getDay();
var d_range = $('#date-range').datepicker({
    toggleActive: true,
    autoclose: true,
    //startDate: start,
    endDate: start,
    pickTime: true,
    //todayHighlight: true
});

$('#date-range').datepicker().on("changeDate", function (e, picker)
{
    $('#date-range').on('click', function ()
    {
        dates.attr('value', '');
        $("input[id$='myfrom']").datepicker("option", "maxDate", null);
        $("input[id$='myto']").datepicker("option", "minDate", null);
    })
});

var d_range = $('#date-rangeSub').datepicker({
    toggleActive: true,
    autoclose: true,
    endDate: start,
    pickTime: true,
});

$('#date-rangeSub').datepicker().on("changeDate", function (e, picker)
{
    $('#date-rangeSub').on('click', function ()
    {
        dates.attr('value', '');
        $("input[id$='myfromSub']").datepicker("option", "maxDate", null);
        $("input[id$='myto'Sub]").datepicker("option", "minDate", null);
    })
});

function exportToExcel(tableID, filename)
{
    var downloadurl;
    var dataFileType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'export_excel_data.xls';

    // Create download link element
    downloadurl = document.createElement("a");

    document.body.appendChild(downloadurl);

    if (navigator.msSaveOrOpenBlob)
    {
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else
    {
        // Create a link to the file
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;

        // Setting the file name
        downloadurl.download = filename;

        //triggering the function
        downloadurl.click();
    }
}