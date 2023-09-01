/*
    Усі налаштування:
    buttonSelector - селектор для кнопки зміни режиму
    light - клас світлої теми
    dark - клас темної теми
    startMode - тема за замовчуванням
*/


export default function lightModeModule({buttonSelector , light='light' , dark='dark' , startMode = true}){
    function setLightMode(mode){
        if(mode){
            document.body.classList.remove(dark);
            document.body.classList.add(light);
            window.localStorage.setItem("LightMode",true);
        }
        else{
            document.body.classList.remove(light);
            document.body.classList.add(dark);
            window.localStorage.setItem("LightMode",false);
        }
    }
    if(window.localStorage.getItem("LightMode") == null){
        setLightMode(startMode);
    }else
    {
        setLightMode(window.localStorage.getItem("LightMode") == "true" );
    }
    document.querySelector(buttonSelector).addEventListener('click',(e)=>{
        setLightMode(!document.body.classList.contains(light));
    });
}
