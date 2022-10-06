const box_elements = document.querySelectorAll(".box");
const start_btn = document.getElementById("play_btn_div");
const reload_btn = document.getElementById("reload_btn_div");
const time_remaining = document.getElementById("score-time-number");
const score_element = document.getElementById("score-score-number");
const record_element = document.getElementById("score-record-number");

let current_mole = 9;
let mole_count = 0;
let cd_timer = 60;
let molepop_interval_id;
let cd_timer_interval_id;
let score = 0;
let record = 0;

update_record_onscreen();

start_btn.addEventListener("click", start_btn_click);
reload_btn.addEventListener("click", reload_btn_click);

box_elements.forEach(function(box){
    box.addEventListener("click", click_catch_mole);
});

function reload_btn_click(){
    location.reload();
}

function start_btn_click(){
    molepop_interval_id = setInterval(pop_mole, 500);
    cd_timer_interval_id = setInterval(run_timer, 1000);
}

function click_catch_mole(){
    clicked_tile_id = this.id[4];
    if(clicked_tile_id == `${current_mole}`){
        // console.log("Mole Caught!");
        ++score;
    }
    score_element.textContent = `${score}`;
}

function run_timer(){
    cd_timer--;
    time_remaining.textContent = `${cd_timer}`;
    if(cd_timer == 0){
        clearInterval(cd_timer_interval_id);
        clearInterval(molepop_interval_id);
        start_btn.removeEventListener("click", start_btn_click);
        box_elements.forEach(function(box){
            box.removeEventListener("click", click_catch_mole);
        });
        if(score > record){
            record_array = ["record", `${score}`]
            update_record_memory(record_array);
            update_record_onscreen();
        }
    }
}

function pop_mole(){
    rand_int = get_rand_int(box_elements.length);
    if(mole_count > 0){
        box_elements[current_mole].classList.remove("mole");
    }
    mole_box = box_elements[rand_int];
    mole_box.classList.add("mole");
    current_mole = rand_int;
    mole_count++;
}

function get_rand_int(max){
    return Math.floor(Math.random()*max);
}

function update_record_onscreen(){
    record_array = JSON.parse(localStorage.getItem("wam"));
    if(record_array){
        if(record_array[0] == "record"){
        record = parseInt(record_array[1]);
        }
        else{
            record = 0;
        }
    }
    else{
        record = 0;
    }
    record_element.textContent = record;
}

function update_record_memory(record_array){
    localStorage.setItem("wam", JSON.stringify(record_array));
}