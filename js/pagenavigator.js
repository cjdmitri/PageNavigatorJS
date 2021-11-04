window.addEventListener('DOMContentLoaded', startup());



function startup() {
    let pagenavigator = document.getElementById('pagenavigator');
    if (pagenavigator === null) {
        console.info('No container PageNavigatorJS');
        return;
    }
    let headersTags = document.querySelectorAll('h2, h3, h4, h5, h6');

    if(headersTags.length===0){
        console.info('No headers');
        return;
    }

    //необходима для определения вложенности списка
    let lastNumberTag;
    let content = '<ul>';
    
    headersTags.forEach(function (item, i, headersTags) {
        if (item.id !== "") {
            let hNumber = parseInt(item.tagName.slice(1));
            if (i == 0) {
                content += '<li><a href="#' + item.id + '">' + item.innerText + '</a></li>';
            }
            else {
                //Если заголовок равен прошлому заголовку, то создаём элемент списка
                if (lastNumberTag === hNumber) {
                    content += '<li><a href="#' + item.id + '">' + item.innerText + '</a></li>';
                }
                //Если номер тега больше прошлого, то создаём вложеный список
                else if (hNumber > lastNumberTag) {
                    let nesting = hNumber-lastNumberTag;
                    for(let i=0;i<nesting; i++){
                        content += '<li><ul>';
                    }
                    content += '<li><a href="#' + item.id + '">' + item.innerText + '</a></li>';

                }
                else if (hNumber < lastNumberTag) {
                    console.log(lastNumberTag + '\t' + hNumber);
                    for (let i = 0; i < lastNumberTag - hNumber; i++) {
                        content += '</ul></li>';
                    }
                    content += '<li><a href="#' + item.id + '">' + item.innerText + '</a></li>';
                }
            }
            lastNumberTag = hNumber;
        }
        else {
            console.log('Header no find id' + item.tagName + item.innerText);
        }
    });
    //Append root list on page
    content += '</ul>';
    pagenavigator.innerHTML = content;
    console.log(content);
}
