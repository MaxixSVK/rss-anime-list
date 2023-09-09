var nickname = ""

function newDel() {
    nickname = document.getElementById('nickname').value;
    localStorage.setItem("nickname", nickname)
}

var nickname2 = localStorage.getItem("nickname");
newDel()

if (!nickname2 == "") {
    let text = document.getElementById("name").innerHTML;
    document.getElementById("name").innerHTML = text.replace("Search for profile", `${nickname2}'s watch history`);
    loadXMLFeed = () => {
        const url = `https://myanimelist.net/rss.php?type=rw&u=${nickname2}`;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(data, "application/xml");
                displayRSS(xml);
            });
    }
    document.addEventListener("DOMContentLoaded", loadXMLFeed);

    function displayRSS(x) {
        let list = document.getElementById('item');
        let item = x.getElementsByTagName('item');
        let itemNum = x.getElementsByTagName('item').length;

        if (itemNum === 0) {
            list.innerHTML = "<li><h3>Profile not found :(</h3></li>"
        }

        else {
            for (let i = 0; i < itemNum; i++) {
                let li = document.createElement('li');
                li.className = "listItem";

                const title = item[i].getElementsByTagName('title')[0].innerHTML;
                const description = item[i].getElementsByTagName('description')[0].innerHTML.replace("<![CDATA[", "").replace("<![CDATA[", "]]>");
                const link = item[i].getElementsByTagName('link')[0].innerHTML;
                const pubdate = item[i].getElementsByTagName('pubDate')[0].innerHTML.replace("-0700", "(UTC -7)");

                if (true) {
                    li.innerHTML =
                        `
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Edited: ${pubdate}</p>
            <a href="${link}">More information</a>

            `;
                }

                list.appendChild(li);
            }
        }
    }
}
