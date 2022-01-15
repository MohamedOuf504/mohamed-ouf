
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

