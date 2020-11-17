window.onload = function () {
    let parametro = ['Jaimeadf', 'UtinhaSz', 'igorl1']

    for (let i = 0; i < parametro.length; i++)
        addNewUser(parametro[i])
};

$("button[name=send-info]").click(function (e) {
    let parametro = $(".search input").val()
    $(".row-infos").empty()
    addNewUser(parametro)
});

$(document).keypress(function (e) {
    if (e.which == 13) {
        let parametro = $(".search input").val()
        $(".row-infos").empty()
        addNewUser(parametro)
    }
});

let SendError = document.querySelector(".Send-Error")
let IconError = document.querySelector(".fa-exclamation-triangle")


function NotifyError() {
    $(".Send-Error").css({ display: "block" });

    SendError.style.webkitAnimationName = "slideInDown"
    SendError.style.animationName = "slideInDown"
    SendError.style.animationDuration = "1s"
    SendError.style.webkitAnimationFillMode = "both"
    SendError.style.animationFillMode = "both"

    IconError.style.webkitAnimationName = "rotateIn"
    IconError.style.animationName = "rotateIn"
    IconError.style.animationDuration = "1s"
    IconError.style.webkitAnimationFillMode = "both"
    IconError.style.animationFillMode = "both"

    $(".Send-Error").fadeOut(3900);
    setTimeout(() => {
        $(".Send-Error").css({ display: "none" });
        location.reload();
    }, 3900);
}

async function getStarCount(parametro) {
    try {
        const response = await axios.get(`https://api.github.com/users/${parametro}/starred`)
        return await response
    } catch {
        NotifyError()
    }
}


async function getUserInfos(parametro) {
    try {
        const response = await axios.get(`https://api.github.com/users/${parametro}`)
        return await response
    } catch {
        NotifyError()
    }
}

async function addNewUser(parametro) {
    const userInfos = await getUserInfos(parametro)
    const Start = await getStarCount(parametro)
    $(".row-infos").append(`
        <div class="style-behind">
        <img class="src-image" onclick="ShowMoreInfo(event)" id=${userInfos.data.login} src=${userInfos.data.avatar_url}>
        <div class="text-limiter">
        <p>Nome: <span>${userInfos.data.name}</span></p>
        <p>Seguidores: <span>${userInfos.data.followers}</span></p>
        <p>Seguindo: <span>${userInfos.data.following}</span></p>
        <p>Stars: <span>${Start.data.length}</span></p>
          </div>
       </div>
    </div>
    `);
}
