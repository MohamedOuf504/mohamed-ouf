function darkFunction() {
  //Change from light mode to dark mode

  //Define variables
  const checkBox = document.getElementById("myCheck");
  const dot = document.getElementById("dot4");
  const body = document.getElementsByTagName("BODY")[0];
  const svg = document.getElementById("svg");
  const label = document.getElementById("switchLabel");
  const label2 = document.getElementById("switchLabel2");

  //If user wants dark mode
  if (checkBox.checked == true) {
    dot.style.fill = "#ffffff"; //Dot turns white
    body.style.backgroundColor = "#000000"; //Background turns black
    svg.style.backgroundColor = "#000000"; //svg background turns black
    //The labels turn white
    label.style.color = "#ffffff";
    label2.style.color = "#ffffff";

    //If they want light mode/default
  } else {
    dot.style.fill = "#000000"; //Dot is black
    body.style.backgroundColor = "#ffffff"; //Background is white
    svg.style.backgroundColor = "#ffffff"; //svg background is white
    //Labels are white
    label.style.color = "#000000";
    label2.style.color = "#000000";
  }
}
function movementFunction() {
  //Change the way the dots move from circular to linear

  //Define variables
  const checkBox = document.getElementById("myCheck2");
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");
  const dot3 = document.getElementById("dot3");
  const dot4 = document.getElementById("dot4");
  const body = document.getElementsByTagName("BODY")[0];
  const svg = document.getElementById("svg");
  const label = document.getElementById("switchLabel");
  const label2 = document.getElementById("switchLabel2");

  //If user wants linear
  if (checkBox.checked == true) {
    //Change each dots x and y values and their animation
    dot1.style.cy = 150;
    dot1.style.cx = 40;
    dot1.style.animation = "moveup 2s ease infinite alternate";
    dot2.style.cy = 150;
    dot2.style.cx = 80;
    dot2.style.animation = "moveup 2s ease 0.5s infinite alternate";
    dot3.style.cy = 150;
    dot3.style.cx = 120;
    dot3.style.animation = "moveup 2s ease 1s infinite alternate";
    dot4.style.cy = 150;
    dot4.style.cx = 160;
    dot4.style.animation = "moveup 2s ease 1.5s infinite alternate";
    svg.style.animation = "none"; //Turn off svg spinning animation
    svg.style.borderRadius = "0%"; //Make the svg back into a square

    //Spinning animation/default
  } else {
    //Set each dot to center of a quadrant of the square and reset their animations
    dot1.style.cy = 50;
    dot1.style.cx = 50;
    dot2.style.cy = 50;
    dot2.style.cx = 150;
    dot3.style.cy = 150;
    dot3.style.cx = 50;
    dot4.style.cy = 150;
    dot4.style.cx = 150;
    dot1.style.animation = "movein 5s ease infinite alternate";
    dot2.style.animation = "movein 5s ease infinite alternate";
    dot3.style.animation = "movein 5s ease infinite alternate";
    dot4.style.animation = "movein 5s ease infinite alternate";
    svg.style.animation = "spin 5s ease infinite alternate"; //Reset svg spin animation
    svg.style.borderRadius = "50%"; //Make svg a circle again
  }
}


window.onload = function(){
  $("#svg").fadeOut(2000 , ()=>{

    $(".loader").fadeOut(1000)

  });

  console.log("f");
  }
  
let sumtotal = 0
let sumcount = 0
let allData = ''
let allData2 = ''
let sum2 = 0
displayAllData()
displayAllData2()
async function GetAllData() {
    let data = await fetch(`https://mohamed-ouf.herokuapp.com/AllData`)
    allData = await data.json()
    allData = await allData.data
}

async function displayAllData() {
    await GetAllData()

    let conteners = ''
    const d = new Date();
    let year = d.getFullYear()
    let month2 = d.getMonth() + 1;
    for (let i = 0; i < allData.length; i++) {
        let month = allData[i].data.split('T')[0]
        let curnet = month.split('-')[1]
        if (month2 == curnet) {
            sumtotal += allData[i].total;
            sumcount += allData[i].count
            conteners += `  <tr>
        <td>${allData[i].data.split('T')[0]}</td>
        <td>${allData[i].total}</td>
        <td>${allData[i].count}</td>
        <td><button class="btn btn-warning"  >تعديل  </button></td>        
        <td><button class="btn btn-danger" >حذف  </button></td>

        </tr>`
        }
    }
    $("#tbody").html(conteners)
    $("#sumtotal").html(sumtotal)
    $("#sumcount").html(sumcount)
    $("#one").html(sumtotal)
    $(".month").html(month2 + "-" + year)
}
async function AddData() {
    const data = {
        data: $("#data").val(),
        total: Number($("#total").val()),
        count: Number($("#count").val()),
    }
    $.post("https://mohamed-ouf.herokuapp.com/AddData", data, function (dataz) {
        console.log(dataz);
    });
}


$("#addBtn").click(function () {
    AddData()

})




async function GatAllimport() {

    let data = await fetch(`https://mohamed-ouf.herokuapp.com/Allimport`)
    allData2 = await data.json()
    allData2 = await allData2.data
    console.log(allData2)

}
GatAllimport()

async function displayAllData2() {
    await GatAllimport()

    let conteners = ''
    const d = new Date();
    let month2 = d.getMonth() + 1;
    for (let i = 0; i < allData2.length; i++) {
        let month = allData2[i].data.split('T')[0]
        let curnet = month.split('-')[1]
        if (month2 == curnet) {
            sum2 += allData2[i].price;
            conteners += ` <tr>
        <td>${allData2[i].data.split('T')[0]}</td>
        <td>${allData2[i].name}</td>
        <td>${allData2[i].counters}</td>
        <td>${allData2[i].type}</td>
        <td>${allData2[i].price}</td>

        <td><button class="btn btn-warning"  >تعديل  </button></td>        
        <td><button class="btn btn-danger" >حذف  </button></td>

        </tr>`
        }
    }
    $("#tbody2").html(conteners)
    $("#sum2").html(sum2)
    $("#three").html(sum2)
    $("#four").html(sumtotal-sum2)



}

async function AddDataimport() {
    const data = {
        data: $("#data").val(),
        name: $("#name").val(),
        counters: Number($("#amount").val()),
        type: $("#cat").val(),
        price: Number($("#price").val()),
    }
    $.post("https://mohamed-ouf.herokuapp.com/Addimport", data, function (dataz) {
        console.log(dataz);
    });
}


$("#addBtn2").click(function () {
    AddDataimport()

})
$("#tow").html(0)

