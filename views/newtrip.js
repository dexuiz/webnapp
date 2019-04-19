<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="/semantic/dist/semantic.min.css">
	<script src="/semantic/dist/semantic.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
   <script
      src="https://code.jquery.com/jquery-3.1.1.min.js"
      integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
      crossorigin="anonymous"></script>
	<title>
		login
	</title>
	<style type="text/css">
    body {
      background-color: #FFFFFF;
    }
    body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }
  </style>
</head>
<body>
<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header">
      <div class="content">
        Add a new trip
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="Start" placeholder="Start location">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="end" placeholder="End location">
          </div>
        </div>
        <div class="field">
          <label>Add Driver</label>
          <div class="ui selection dropdown">
            <input type="hidden" name="driver">
            <i class="dropdown icon"></i>
            <div class="default text">Add Driver</div>
            <div class="menu">
              <div class="item" data-value="1">Driver 1</div>
              <div class="item" data-value="0">Driver 2</div>
          </div>
        </div>
        <div class="ui fluid large teal submit button">Login</div>
      </div>

      <div class="ui error message"></div>

    </form>

    <div class="ui message">
      Welcome to driveasy
    </div>
 </div>
</div>
</body>
</html>