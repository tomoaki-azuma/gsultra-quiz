const quizSet = shuffle([
    {q: 'linux系OSのスケジューラーと言えば？', c: ['cron', 'alone', 'clone','烏龍茶'], a: '0'},
    {q: '次のうちプログラムバージョン管理ツールは', c: ['kit', 'jit', 'pit','git'], a: '3'},
    {q: 'python内包表記を英語ではなんと言う？', c: ['naiho hyoki', 'list comprehension', 'inline expression', 'inline list'], a: '1'},
    {q: '次のうち ruby　によるフレームワークは？', c: ['django', 'catalyst', 'ruby on rails', 'react'], a: '2'},
    {q: '1biteは何bit？', c: ['8', '2', '4','16'], a: '0'},
    {q: '1,1,2,3,5,8,13.....何数列？', c: ['モンチッチ', 'フィボナッチ', 'ジョコビッチ','等差'], a: '1'},
    {q: '幅優先探索、略して？', c: ['BFS', 'DFS', 'WHO','HYT'], a: '0'},
    {q: '変数や関数の参照できる範囲のことを何という？', c: ['スロープ', 'スコップ', 'スコープ','レンジ'], a: '2'},
  ]);

const label = ['A','B','C','D']
let ans_no = -1;
let answered = false;
let answer;
let next = false;
let current = 0;
let correct = 0;
let final = false;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}



$("li").on('click', function(){
    if (next) {
        return;
    }
    var id = $(this).attr('id');
    ans_no = $(this).children('p').attr('id');
    answered = true;

    if ($(this).attr('class') === 'select'){
        $(this).removeClass('select');
        $(this).addClass('no-select');
    } else {
        $("li").removeClass('select');
        $("li").addClass('no-select');
        $(this).addClass('select');
    }

    $('#ans-btn').removeClass('disabled');

})

function init_question() {
    ans_no = -1;
    answered = false;
    next = false;
    var q = quizSet[current];
    var ans = q['c'];
    var question = q['q'];
    answer = q['a']

    $('#ans-btn').text('解答');
    $('.message-box').hide();
    $('.main-box').css("display", "block");
    $('#question-description').text(question)

    for (let i = 0; i < 4; i++) {
        $("li").removeClass('select');
        $("li").addClass('no-select');
    }

    for (let i = 0; i < 4; i++) {
        $('li p#' + i.toString()).hide()
        $('li p#' + i.toString()).text(label[i] + ' : ' + ans[i])
        $('li p#' + i.toString()).delay(1500 * i).fadeIn(1500);
    }
}

$("#btn-start").on('click', function(){
    init_question();
})

$("#ans-btn").on('click', function(){
    if (answered === false) {
        return
    }

    if (final) {
        if (answer === ans_no) {
            console.log($('li #' + answer.toString()).text())
            $('li p#' + ans_no.toString()).append('  ○　正解')
            var music = new Audio('sound/901.mp3');
            music.play();
            correct++;
        } else {
            console.log($('li #' + answer.toString()).text())
            $('li p#' + ans_no.toString()).append('  ×　不正解')
            var music = new Audio('sound/540.mp3');
            music.play();
        }
        var message = ''
        if (correct === quizSet.length) {
            message = 'おめでとう！勝ち抜けだ！！'
            $('.result-img').children('img').attr('src', 'img/ny.png')
            var music = new Audio('sound/clear.mp3');
            music.play();
        } else {
            message = '残念。東京へお帰りください。';
            $('.result-img').children('img').attr('src', 'img/tokyo.jpg')
        }
        $('#result-message').text(message);
        $('#result').removeClass('hidden');
    }

    if (next === false) {
        if (current < quizSet.length - 1) {
            if (answer === ans_no) {
                console.log($('li #' + answer.toString()).text())
                $('li p#' + ans_no.toString()).append('  ○　正解')
                var music = new Audio('sound/901.mp3');
                music.play();
                correct++;
            } else {
                console.log($('li #' + answer.toString()).text())
                $('li p#' + ans_no.toString()).append('  ×　不正解')
                var music = new Audio('sound/540.mp3');
                music.play();
            }
    
            current++;
            next = true;
            $('#ans-btn').text('次へ');
        } else {
            $('#ans-btn').text('ファイナルアンサー？');
            final = true;
        }
    } else {
        init_question();   
    }

    
})
