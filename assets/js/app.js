//qna stands for Question and Answers
//code is written so that object remains intact at end of game, although not for reuse.
var qna = {
    set1: {
        question: 'Which one of these Sonic games gives you literal cancer?',
        answerSet: [{answer: 'Sonic Adventure 2 Battle'}, {answer: 'Sonic Colors'}, {answer: "Sonic '06", isTrue: true}, {answer: 'Sonic & Knuckles'}],
		used:false
    },
    set2: {
        question: "Who's dead at the end of The Sixth Sense... I mean Final Fantasy X?",
        answerSet: [{answer: 'Auron'}, {answer: 'Yuna'}, {answer: 'Tidus', isTrue: true}, {answer: 'Rikku'}],
		used:false
    },
    set3: {
        question: "&quotI'm Commander Shepard and...&quot",
        answerSet: [{answer: '&quotthis is war!&quot'}, {answer: '&quotI am the one who knocks!&quot'}, {answer: '&quotthis is my favorite store on the citadel!&quot', isTrue: true}, {answer: '&quotI will vanquish evil!&quot'}],
		used:false
    },
    set4: {
        question: 'Who are the counterparts to Mario and Luigi?',
        answerSet: [{answer: 'Wamio and Waleo'}, {answer: 'Weachi and Walucario'}, {answer: 'Wario and Waluigi', isTrue: true}, {answer: 'Walus and Wario'}],
		used:false
    },
    set5: {
        question: 'The Legend of Zelda: ...',
        answerSet: [{answer: 'Oboe of Time'}, {answer: 'Harp of Time'}, {answer: 'Ocarina of Time', isTrue: true}, {answer: 'Flute of Time'}],
		used:false
    },
    set6: {
        question: 'The main character of the Halo series is called?',
        answerSet: [{answer: 'Lieutenant Rogers'}, {answer: 'Chief Sam'}, {answer: 'Master Chief', isTrue: true}, {answer: 'Captain Alex'}],
		used:false
    },
    set7: {
        question: 'What is Spyro?',
        answerSet: [{answer: 'An Undead Skeleton'}, {answer: 'An Ancient Wizard'}, {answer: 'A Dragon', isTrue: true}, {answer: 'A Tiger Swordsman'}],
		used:false
    },
    set8: {
        question: 'In which FPS (First Person Shooter) game can you shoot zombies?',
        answerSet: [{answer: 'Counter-Strike'}, {answer: 'Battlefield'}, {answer: 'Call of Duty', isTrue: true}, {answer: 'Medal of Honor'}],
		used:false
    },
    set9: {
        question: 'Which fighting game has the character Voldo?',
        answerSet: [{answer: 'Street Fighter'}, {answer: 'Tekken'}, {answer: 'Soul Calibur', isTrue: true}, {answer: 'Virtua Fighter'}],
		used:false
    },
    set10: {
        question: 'The three big console companies are?',
        answerSet: [{answer: 'Apple, Samsung, and Sony'}, {answer: 'Nintendo, Sony, and Apple'}, {answer: 'Sony, Microsoft, and Nintendo', isTrue: true}, {answer: 'Nintendo, Sony, Apple'}],
		used:false
    }
};
function getQuestion() {
	if (round >= 10) {
		return endGame()
	}
	var currSet = 'set' + (Math.floor(Math.random() * 10) + 1)
	while (qna[currSet].used) {
		currSet = 'set' + (Math.floor(Math.random() * 10) + 1)
		//just in case something manages to slip into this loop
		if (round >= 10) {break}
	}
	qna[currSet].used = true
	++round
	$('#question').html(qna[currSet].question)
	loadAnswers(currSet)
}
function randomAnswer(set) {
	var currValue = Math.floor(Math.random() * 4)
	while (usedItems.indexOf(currValue) > -1) {
		currValue = Math.floor(Math.random() * 4)
	}
	usedItems.push(currValue)
	return qna[set].answerSet[currValue]
}
function loadAnswers(set) {
	var currAnswer;
	for (i = 1; i < 5; i++) {
		currAnswer = randomAnswer(set)
		$('#ans' + i).html(currAnswer.answer)
		if (currAnswer.hasOwnProperty('isTrue')) {
			$('#ans' + i).addClass('true')
		}
	}
	usedItems = []
    secs = 6;
    startTimer = setTimeout(function(){
        clearInterval(timer)
        getQuestion()
		$('#time').text('6 seconds left!')
    },6000)
    timer = setInterval(function() {
        secs--
        $('#time').text(secs + ' seconds left!')
    },1000)
}
function endGame() {
	var message;
    $('#time').html('///////////////////////////////////////')
	$('#question').html('RESULTS RESULTS RESULTS')
	$('#question').css('height', '50px')
	$('.answers').empty()
	$('.answers').html('YOU SCORED ' + score + ' OUT OF 10<br>')
	switch(score) {
		case 0:
			message = 'You literally know nothing about games. Leave!'
			$('audio').attr('src','assets/music/sanictheme.mp3')
			break;
		case 1:
		case 2:
		case 3:
			message = 'You managed to get some right, eh?'
			break;
		case 4:
		case 5:
			message = "You've played a little."
			break;
		case 6:
		case 7:
			message = 'You know some stuff!'
			break;
		case 8:
		case 9:
			message = "You don't need a perfect score for me to see that you're a great gamer!"
			break;
		case 10:
			message = "PERFECTION!"
			$('audio').attr('src','assets/music/sonictheme.mp3')
			break;
			
	}
	$('.answers').append('<h1>' + message + '</h1>')
	
}
var startTimer;
var timer;
var secs = 6;
var score = 0;
var round = 0;
var quizStart = false;
var usedItems = [];

$(document).ready(function() {
    $('body').dblclick(function() {
         if (!quizStart){
            quizStart = true;
            $('#pregame').empty()
            getQuestion();
         }
    })
    $('.answers p').mouseenter(function() {
        if(quizStart) {
            $(this).css({
                'border':'2px solid blue',
                'background-color':'orange'
            })
        }
    })
	$('.answers p').click(function() {
		if (quizStart) {
			if ($(this).hasClass('true')) {
				score++;
			}
        	$('.answers p').removeClass('true')
        	clearTimeout(startTimer)
        	clearInterval(timer)
        	getQuestion()
			$('#time').text('6 seconds left!')
		}
	})	
    $('.answers p').mouseleave(function() {
        $(this).css({
			'border':'',
			'background-color':''
		})
    })
})