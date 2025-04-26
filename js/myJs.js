const textConfig = {
  text1: "Tôi chào anh",
  text2: "Tôi đề nghị anh báo cáo thành thật",
  text3: "Anh có bị gay không?",
  text4: "Nếu anh out ra thì không còn nghi ngờ gì nữa",
  text5: "Tất nhiên là không :v",
  text6: "Không, tôi bị gay",
  text7: "Anh bị gay từ khi nào",
  text8: "Xác Nhận",
  text9: "Không khi nào là tôi ko gay!!!!!!!!!!",
  text10: "Hãy đầu thú để nhận khoan hồng",
  text11: "Mong anh thành thật với xã hội về giới tính riêng của mình",
  text12: "Next",
};

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/cuteCat.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // Hàm đổi vị trí nút "Yes" và "No"
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNo = $("#no").css("top");
    var leftYes = $("#yes").css("left");
    var topYes = $("#yes").css("top");
    $("#no").css("left", leftYes);
    $("#no").css("top", topYes);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNo);
  }

  // Hàm di chuyển nút "No" đến vị trí ngẫu nhiên
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  // Xử lý sự kiện di chuột qua hoặc nhấn vào nút "No"
  var n = 0;
  $("#no").mousemove(function () {
    if (n === 0) {
      switchButton(); // Lần đầu tiên đổi vị trí nút
    } else {
      moveButton(); // Các lần tiếp theo di chuyển nút
    }
    n++;
  });

  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // Hiển thị popup khi nhấn nút "Yes"
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='When'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            // Kiểm tra thiết bị
            if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
              // Nếu là thiết bị di động
              window.location = "fb-messenger://user-thread/100052153265524";
            } else {
              // Nếu là máy tính
              window.location = "https://www.messenger.com/t/100052153265524";
            }
          },
        });
      }
    });

    // Hàm tự động trả lời
    $("#txtReason").on("input", function () {
      var inputText = $(this).val();
      var text9 = textConfig.text9;
      var generatedText = text9.substring(0, inputText.length);
      $(this).val(generatedText);
    });
  });
});
