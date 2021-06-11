google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(setbutton);
function setbutton() {
   b = document.getElementById("header-user-chips");
   b.insertAdjacentHTML(
      "beforebegin", 
      `<button id='plotb'
         style='color:#cccccc;
                height:25px;
                width:25px;
                font-size:14px;
                font-weight:900;
                border:none;
                border-radius:100%;
                margin:0px 5px 0px 5px;
                background-color:rgb(100,100,100)'>P</button>`);
   document.getElementById('plotb').onclick = drawchart;
}

function drawchart() {
   lists=document.getElementsByClassName("activity-hands-list")
   console.log("Lists length",lists.length);
   for (list of lists) {
      insert = list.parentNode
      elem = insert.getElementsByClassName("chart");
      console.log(elem.length);
      if (elem.length == 1) continue;
﻿      chips=list.getElementsByClassName("activity-hands-chips")
      hrefs=list.getElementsByClassName("activity-hands-time");
      tchips=0; hands=[];handsa=[[]];
      handsa[0]=['Deal','Stack',{role:'tooltip'}]
      hand={chips:0,tchips:0,href:""}
      for (i=0;i<chips.length;i++) {
         sign = (chips[i].getElementsByClassName("fa-arrow-down negative").
                 length == 0) ? 1 : -1;
         hand.chips = sign*Number(chips[i].innerText);
         tchips += hand.chips;
         hand.tchips = tchips;
         hand.href = hrefs[i].getElementsByTagName("a")[0].href;
         hands.push({...hand});
         tooltip = i+","+hand.chips+","+hand.tchips;
         handsa.push([i,hand.tchips,tooltip]);
      }

      // Set Options for Google chart
      var options = {
         title: 'Hands Vs Stack size',
         titleTextStyle: {color: 'white'},
         hAxis: {title: 'Hands',  
         titleTextStyle: {color: 'white'},
         baselineColor: 'white',
         textStyle: {color: 'white'}},
         vAxis: {title: 'Stack size',  
         titleTextStyle: {color: 'white'},
         baselineColor: 'white',
         textStyle: {color: 'white'}},
         backgroundColor: '#172633',
         colors: ['white','blue'],
         // tooltip: { isHtml: true },
        legend: 'none'
      };

      // draw
      elem = document.createElement('div');
      elem.className = "chart"
      elem.setAttribute('style', 'width:100%; height:400px; padding:1em 0em');
      insert = list.parentNode.childNodes[1]
      insert.insertAdjacentElement('afterend', elem)
      chart = new google.visualization.LineChart(elem);
      data = google.visualization.arrayToDataTable(handsa);
      chart.draw(data, options);

      //open hand when clicked
      google.visualization.events.addListener(chart,'click',handler);

      function handler(e) {
         console.log(e);
         if (e.targetID.includes("point")) {
            row = e.targetID.match(/\d+/g)[1];
            window.open(hrefs[row].getElementsByTagName("a")[0].href, '_blank');
         }
      }
   }
}