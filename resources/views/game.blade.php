<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <meta id="token" content="{{ csrf_token() }}" />

    <link rel="stylesheet" href="assets/css/game.css">
    <link rel="stylesheet" href="assets/css/topNav.css">
    <link rel="stylesheet" href="assets/css/works.css">

</head>
<body>

<style>
    #topNav2 {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1000;
    }
    #topNav2 a {
        color: white;
    }
</style>
<nav id="topNav2">
    <a href="#/about"><span>about</span></a>
    <a href="#/skills"><span>skills</span></a>
    <a href="#/work"><span>work</span></a>
    <a href="/"><span>game</span></a>
</nav>


<script type="text/template" id="tmplSkill">
    <div class="works-work-title">
        <span><%=nameTitle%></span>
    </div>
    <div class="works-img">
        <div class="works-img-bg" style="background-image:url('assets/img/skills/<%=nameImg%>.png')"></div>
    </div>
</script>

<script type="text/template" id="tmplScoreBoard">
    <div title="Time limit" class="timeLimit">
        <svg version="1.1" width="22" xmlns="http://www.w3.org/2000/svg" preserveaspectratio="xMidYMid meet" viewbox="0 0 50 50" space="preserve" data-icon="time" class="i-svg">
            <path d="M7.533,21.646C9.111,13.06,16.633,6.552,25.678,6.552c10.188,0,18.447,8.259,18.447,18.448 c0,10.19-8.259,18.447-18.447,18.447c-7.167,0-13.378-4.084-16.433-10.053h3.886c2.708,4.039,7.317,6.699,12.547,6.699 c8.336,0,15.094-6.758,15.094-15.094S34.014,9.907,25.678,9.907c-7.184,0-13.195,5.018-14.72,11.739H7.533L7.533,21.646z M24.838,25.587l8.74,5.151l0.851-1.444l-7.913-4.706V13.314h-1.678V25.587z M8.906,28.354l5.031-6.708H3.875L8.906,28.354z M7.533,21.646C9.111,13.06,16.633,6.552,25.678,6.552c10.188,0,18.447,8.259,18.447,18.448c0,10.19-8.259,18.447-18.447,18.447 c-7.167,0-13.378-4.084-16.433-10.053h3.886c2.708,4.039,7.317,6.699,12.547,6.699c8.336,0,15.094-6.758,15.094-15.094 S34.014,9.907,25.678,9.907c-7.184,0-13.195,5.018-14.72,11.739H7.533L7.533,21.646z M24.838,25.587l8.74,5.151l0.851-1.444 l-7.913-4.706V13.314h-1.678V25.587z M8.906,28.354l5.031-6.708H3.875L8.906,28.354z" fill="#6a6a6a"></path>
        </svg>
        <div class="timeLimitCounter"><span id="timer">30</span>s</div>
    </div>
    <div id="loader" class="loader">
        <div id="loaderSlip" class="loaderSlip"></div>
    </div>
</script>

<script type="text/template" id="tmplBoardResult">
    <div class="resultsTable">
        <div>
            <div class="resultsClose"></div>
            <h3><span id="resScore">000</span> points</h3>
            <!--<p>Right. You were defeated the webpage lettering.</p>-->
            <ul>
                <li>
                    <div>TIME</div>
                    <div id="resTimeSpend">0.001s</div>
                </li>
                <li>
                    <div>SHOOTS</div>
                    <div id="resShoots">0</div>
                </li>
                <li>
                    <div>DESTROYED</div>
                    <div id="resDestroyed">0</div>
                </li>
                <li>
                    <div>ACCURACY</div>
                    <div><span id="resAccuracy">0</span>%</div>
                </li>
                <li>
                    <div><span>YOUR BEST</span></div>
                    <div id="resBestScore">000</div>
                </li>
            </ul><a id="openBoardLeader" class="linkBtn">VIEW LEADERBOARD</a>
        </div>
    </div>
</script>



<script type="text/template" id="tmplBoardLeader">
    <div class="leaderTable">
        <div>
            <div class="resultsClose"></div>
            <h3>LEADERBOARD</h3>
            <ul id="topLeaders"></ul>
        </div>
    </div>
</script>
<script type="text/template" id="tmplLeader">
    <div><%=i%>st <span><%=name%></span></div>
    <div><%=score%></div>
</script>
<script type="text/template" id="tmplYourScore">
    <div><%=i%>st <span id="resultName"><input id="resultNameInput" placeholder="your name"></span></div>
    <div><a class="linkBtn" id="saveScore">SAVE</a> <%=score%></div>
</script>


<script type="text/template" id="tmplMenu">
    <a href=""><span>game</span></a>
    <a href="#/work"><span>work</span></a>
    <a href="#/skills"><span>skills</span></a>
    <a href="#/about"><span>about</span></a>
    <a href="#/contact"><span>contact</span></a>
</script>

<script type="text/template" id="tmplWork">
    <div class="works-work-title">
        <div><i></i><i></i><i></i></div>
        <span><%=nameTitle%></span>
    </div>
    <div class="works-img" style="background-image:url('assets/img/portfolio/big/<%=nameImg%>.jpg')">
        <div class="works-img-desc">
            <% _.each(skills, function(skill) { %>
            <div><%=skill%></div>
            <% }); %>
        </div>
    </div>
</script>

<!--<script src="node_modules/jquery/dist/jquery.js"></script>-->
<script src="dist/main.js"></script>

</body>
</html>