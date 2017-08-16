<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'faultanalysis');
define('DB_USER', 'root');
define('DB_PASS', '');
define('TB_NAME', 'Faults');
define('TB_SYMP', 'Symptoms');
define('TB_SOLN', 'Solutions');
define('TB_USERS', 'Users');

switch ($_POST["formID"]) {
	case 'addFault':
		$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if (!$connect) {
			die ('Could not connect: ' . mysqli_connect_error());
		}
		// echo "Connected successfully";

		$article_id = testIfClean($_POST["article_id"]);
		$heading = testIfClean($_POST["heading"]);
		$description = testIfClean($_POST["description"]);
		$symptom = testIfClean($_POST["symptoms"]);
		$solution = testIfClean($_POST["solutions"]);
		$author = testIfClean($_POST["author"]);

		if (checkParameter($connect, TB_NAME, $article_id)) {
			echo "Fault Already Exist. Thanks Anyway.";
		} else {
			// 		$addFault = addFault(TB_NAME, $article_id, $heading, $symptom, $solution);
			echo addFault($connect, TB_NAME, $article_id, $heading, $description, $symptom, $solution, $author);
			// 		echo $addFault;
		}
		break;

	case 'getFaults':
		$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if (!$connect) {
			die ('Could not connect: ' . mysqli_connect_error());
		}
		// 	echo "Connected successfully <br> <br>";
		
		$faults_result = getFaults($connect, TB_NAME);
		echo $faults_result;
		break;

	case 'gSymp':
		$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if (!$connect) {
			die ('Could not connect: ' . mysqli_connect_error());
		}
		// 	echo "Connected successfully <br> <br>";
		$posts_result = getRequests($connect, TB_SYMP);
		echo $posts_result;
		break;

	case 'gSoln':
		$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if (!$connect) {
			die ('Could not connect: ' . mysqli_connect_error());
		}
		// 	echo "Connected successfully <br> <br>";
		$posts_result = getRequests($connect, TB_SOLN);
		echo $posts_result;
		break;

	

	case 'nSymp':
		$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if (!$connect) {
			die ('Could not connect: ' . mysqli_connect_error());
		}
		// echo "Connected";
		$heading = testIfClean($_POST["heading"]);
		// $heading = $_POST["heading"] ?? "undefined";
		// echo "pHeading : " . $heading;
		$description = testIfClean($_POST["description"]);
		// $description = $_POST["description"] ?? "undefined";
		// echo "pDescription : " . $description;
		$author = testIfClean($_POST["author"]);
		$article_id = testIfClean($_POST["article_id"]);

		if (checkParameter($connect, TB_SYMP, $article_id)) {
			echo "Successful";
		} else {
			$insertToSQL = insert_Request_SQL($connect ,TB_SYMP, $heading, $description, $author, $article_id);
			echo $insertToSQL;
		}
		break;

	case 'nSoln':
		$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if (!$connect) {
			die ('Could not connect: ' . mysqli_connect_error());
		}
		// echo "Connected successfully";
		$heading = testIfClean($_POST["heading"]);
		$description = testIfClean($_POST["description"]);
		$author = testIfClean($_POST["author"]);
		
		$article_id = testIfClean($_POST["article_id"]);
		if (checkParameter($connect, TB_SOLN, $article_id)) {
			echo "Successful";
		} else {
			$insertToSQL = insert_Request_SQL($connect ,TB_SOLN, $heading, $description, $author, $article_id);
			echo $insertToSQL;
		}
		break;
	
	default:
		echo $_POST["formID"];
		mysqli_close($connect);
		break;
}



function checkParameter ($connect, $table, $article_id) {
	$checkFault = "SELECT SID FROM $table WHERE SID='$article_id'";
	$result_checkFault = mysqli_query($connect, $checkFault);
	if ( mysqli_fetch_assoc($result_checkFault)) {
		return true;
	}
	else {
		return false;
	}
}


function addFault ($connect, $table, $article_id, $heading, $description, $symptom, $solution, $author) {
	$sqlInsert = "INSERT INTO $table (SID, Heading, Description, Symptoms, Solutions, Author) VALUES ('$article_id', '$heading', '$description', '$symptom', '$solution', '$author')";
	if (!mysqli_query($connect, $sqlInsert)) {
		die ('Error: ' . mysqli_error());
	}
	return "Successfully added New Fault Analysis";
}


function testIfClean ($data) {
	$data = trim( stripslashes( htmlspecialchars ( strip_tags ( str_replace( array( "(", ")"), "", $data)), ENT_QUOTES)));
	return $data;
}


function getRequests($connect, $table) {
	$i = 0;
	$sql_search = "SELECT * FROM $table";
	$search_result =  mysqli_query($connect, $sql_search);
	if (mysqli_num_rows($search_result) == 1) {
		$row = mysqli_fetch_assoc($search_result);
		echo "sid" . "|:|" .$row["SID"] . "||" . "heading" . "|:|" .$row["Heading"] . "||" . "description" . "|:|" .$row["Description"] . "||" . "author" . "|:|" .$row["Author"];
	}
	else if (mysqli_num_rows($search_result) > 1) {
		while($row = mysqli_fetch_assoc($search_result)) {
			echo "sid" . "|:|" .$row["SID"] . "||" . "heading" . "|:|" .$row["Heading"] . "||" . "description" . "|:|" .$row["Description"] . "||" . "author" . "|:|" .$row["Author"] . "|||";
		}
	}
}


function getFaults($connect, $table) {
	$sql_search = "SELECT * FROM $table";
	$search_result =  mysqli_query($connect, $sql_search);
	if (mysqli_num_rows($search_result) == 1) {
		$row = mysqli_fetch_assoc($search_result);
		echo "sid" . "|:|" . $row["SID"] . "||" . "heading" . "|:|" . $row["Heading"] . "||" . "description" . "|:|" .$row["Description"] . "||" . "symptoms" . "|:|" .$row["Symptoms"]. "||" ."solutions" . "|:|" .$row["Solutions"]. "||" ."creationDate" . "|:|" .$row["CreationDate"]. "||" ."author" . "|:|" .$row["Author"] . "|||";
	}
	else if (mysqli_num_rows($search_result) > 1) {
		while($row = mysqli_fetch_assoc($search_result)) {
			echo "sid" . "|:|" . $row["SID"] . "||" . "heading" . "|:|" . $row["Heading"] . "||" . "description" . "|:|" .$row["Description"] . "||" . "symptoms" . "|:|" . $row["Symptoms"]. "||" ."solutions" . "|:|" . $row["Solutions"]. "||" ."creationDate" . "|:|" . $row["CreationDate"]. "||" ."author" . "|:|" . $row["Author"] . "|||";
		}
	}
}


function searchForQuery ($connect, $table, $value_search, $excluded_posts) {
	$i = 0;
	$queryLimit = 6;
	$sqlQueryLimit = $queryLimit + 1;
	if (isset($excluded_posts)) {
		$sql_search = "SELECT ID, Heading, Summary, Location, Image, Tags, CreationDate, UpdateDate FROM $table WHERE ($excluded_posts) AND (Heading LIKE '%$value_search%' OR Summary LIKE '%$value_search%' OR Tags LIKE '%$value_search%') ORDER BY UpdateDate DESC LIMIT $sqlQueryLimit";
	}
	else {
		$sql_search = "SELECT ID, Heading, Summary, Location, Image, Tags, CreationDate, UpdateDate FROM $table WHERE (Heading LIKE '%$value_search%' OR Summary LIKE '%$value_search%' OR Tags LIKE '%$value_search%') ORDER BY UpdateDate DESC LIMIT $sqlQueryLimit";
	}
	$search_result =  mysqli_query($connect, $sql_search);
	if (mysqli_num_rows($search_result) == 1) {
		$row = mysqli_fetch_assoc($search_result);
		echo "Location" . "|:|" .$row["Location"] . "||" . "Heading" . "|:|" .$row["Heading"] . "||" . "Summary" . "|:|" .$row["Summary"] . "||" . "Image" . "|:|" .$row["Image"] . "||" . "Tags" . "|:|" .$row["Tags"] . "||" . "CreationDate" . "|:|" .$row["CreationDate"] . "||" . "UpdateDate" . "|:|" .$row["UpdateDate"];
	}
	else if ((mysqli_num_rows($search_result) > 1) && (mysqli_num_rows($search_result) <= $queryLimit)) {
		while($row = mysqli_fetch_assoc($search_result)) {
			echo "Location" . "|:|" .$row["Location"] . "||" . "Heading" . "|:|" .$row["Heading"] . "||" . "Summary" . "|:|" .$row["Summary"] . "||" . "Image" . "|:|" .$row["Image"] . "||" . "Tags" . "|:|" .$row["Tags"] . "||" . "CreationDate" . "|:|" .$row["CreationDate"] . "||" . "UpdateDate" . "|:|" .$row["UpdateDate"] . "|||";
		}
	}
	else if (mysqli_num_rows($search_result) > $queryLimit) {
		while ($row = mysqli_fetch_assoc($search_result)) {
			if ($i == $queryLimit) {
				echo "";
			}
			else {
				echo "Location" . "|:|" .$row["Location"] . "||" . "Heading" . "|:|" .$row["Heading"] . "||" . "Summary" . "|:|" .$row["Summary"] . "||" . "Image" . "|:|" .$row["Image"] . "||" . "Tags" . "|:|" .$row["Tags"] . "||" . "CreationDate" . "|:|" .$row["CreationDate"] . "||" . "UpdateDate" . "|:|" .$row["UpdateDate"] .  "||" . "id" . "|:|" . $row["ID"] . "|||";
			}
			$i++;
		}
		echo "moreQuery";
	}
	else {
		echo "0 results";
	}
}


function insert_Request_SQL ($connect, $table, $heading, $description, $author, $article_id) {
	$sqlInsert = "INSERT INTO $table (Heading, Description, Author, SID) VALUES ('$heading', '$description', '$author', '$article_id')";
	if (!mysqli_query($connect, $sqlInsert)) {
		die ('Error: ' . mysqli_error());
	}
	return "Successful";
}


function correctString($str)
{
    $str = $str.replace("'", "\'");
    return $str;
}


?>