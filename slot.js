
document.addEventListener("DOMContentLoaded", ready);

function ready(){
    var slot = new Slot();
    slot.init();
}

function Slot(){
    
    this.spinners = [
        {
            "duration" : 500,
            "speed" : 10,
            "symbols" : [],
            "image_slider" : {},
            "interval" : {},
            "current_symbol_index" : 0,
            "random_symbols" : []
        },
        {
            "duration" : 600,
            "speed" : 20,
            "symbols" : [],
            "image_slider" : {},
            "interval" : 0,
            "current_symbol_index" : 0,
            "random_symbols" : []
        },
        {
            "duration" : 700,
            "speed" : 30,
            "symbols" : [],
            "image_slider" : {},
            "interval" : 0,
            "current_symbol_index" : 0,
            "random_symbols" : []
        }   
    ];

    this.symbols = [
        {
            "html" : '<li><div class="seven icon"></div></li>',
            "name": "seven",
            "position" : 0
        },
        {
           "html" : '<li><div class="triplebar icon"></div></li>',
           "name" : "triplebar",
           "position" : 0
        },
        {
            "html" : '<li><div class="doublebar icon"></div></li>',
            "name" : "doublebar",
            "position" : 0
        },
        {
            "html" : '<li><div class="doublebar icon"></div></li>',
            "name" : "doublebar",
            "position" : 0
        },
        {
            "html" : '<li><div class="bar icon"></div></li>',
            "name" : "bar",
            "position" : 0
        },
        {
            "html" : '<li><div class="bar icon"></div></li>',
            "name" : "bar",
            "position" : 0
        },
        {
            "html" : '<li><div class="bar icon"></div></li>',
            "name" : "bar",
            "position" : 0

        },
        {
            "html" : '<li><div class="cherry icon"></div></li>',
            "name" : "cherry",
            "position": 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position":0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position"  :0
        },
        {
            "html" : '<li><div class="blank icon"></div></li>',
            "name" : "empty",
            "position" : 0
        }
    ];
}

Slot.prototype.init = function(){
    this.initSpiner();
    this.bind();
}

Slot.prototype.bind = function(){
    var spin = document.getElementById("spin");
    var self = this;
    spin.addEventListener("click", function(){
        for(var i = 0 ;i< self.spinners.length;i++){
            self.rotateSpin(self.spinners[i]);
        }
    });
}

Slot.prototype.initSpiner = function (){
    if(this.spinners){
        for(var i=0;i< this.spinners.length; i++){
            this.spinners[i].symbols = this.symbols;
            var index = i + 1;
            this.spinners[i].image_slider = document.getElementById("image_slider" + index);
        }
        this.showCurrentSpinners();
    }
}

Slot.prototype.random = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

Slot.prototype.rotateSpin = function(spin){
    var self = this;
    var speed = spin.speed;
    var duration = spin.duration;
    spin.interval = setInterval(function(){
        speed--;
        duration--;
        if(speed < 0){
            speed = spin.speed;
        }
        spin.current_symbol_index++;
        if(spin.current_symbol_index == self.symbols.length){
            spin.current_symbol_index = 0;
        }
        spin.image_slider.scrollTop += 10;
        if(spin.image_slider.scrollTop == spin.image_slider.scrollHeight - 100){
            spin.image_slider.scrollTop = 0;
        }
        
        if(duration == 0){         
           /*document.getElementById("goal").innerHTML += 
           
           "|"+ self.getSymbolNameByPos(spin,spin.image_slider.scrollTop);*/
           
           clearInterval(spin.interval);
        }
        
    },speed);
}

Slot.prototype.showCurrentSpinners = function(){
    this.setSpinnerIndex();
    for(var i = 0;i<this.spinners.length;i++){
        this.spinners[i].current_symbol_index = this.random(0, this.symbols.length);
        this.sliderHtml(this.spinners[i]);
        
    }
}

Slot.prototype.sliderHtml = function(spiner){
    var index = 0;
    var pos  = 0;
    var idx = spiner.current_symbol_index;
    while(index < spiner.symbols.length){
        if(idx >= spiner.symbols.length) { idx = 0 };
        spiner.image_slider.innerHTML += spiner.symbols[idx].html;
        spiner.random_symbols.push(spiner.symbols[idx]);
        idx++;
        index++;
    }
}

Slot.prototype.getSymbolNameByPos = function(spiner,pos){
    var  idx = pos/100;
    if(spiner.random_symbols[idx])
    {
        return spiner.random_symbols[idx].name;
    }
    return "empty";
}

Slot.prototype.setSpinnerIndex = function(){
    for(var i=0;i < this.spinners.length;i++){
        this.spinners[i].current_symbol_index = this.random(0, this.spinners[i].symbols.length);
    }
}
