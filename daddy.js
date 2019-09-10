    const Gaincombo = [
    [0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14],[15,16,17],[18,19,20],[21,22,23],
    [0,9,21],[3,10,18],[6,11,15],[1,4,7],[16,19,22],[8,12,17],[5,13,20],[2,14,23]
    ];
    const mv=[
        [1,9],[0,2,4],[1,14],[4,10],[1,3,5,7],[4,13],[7,11],[4,6,8],[7,12],[0,10,21],[3,9,11,18],[6,10,15],
        [8,13,17],[5,12,14,20],[2,13,23],[11,16],[15,17,19],[12,16],[10,19],[16,18,20,22],[13,19],[9,22],[19,21,23],[14,22]
    ];
    const count=[9,9];
    var val,ind=-1,en=0;
    var play='1';
    const grid = () => Array.from(document.getElementsByClassName('q'));
    const qNumid = (ele) => Number.parseInt(ele.id.replace('q',''));
    const empq = () => grid().filter(ele => ele.innerText === '');
    const allsame = (arr) =>  arr.every(ele =>  ele.innerText !== '' && ele.innerText === arr[0].innerText );
    
    const taketurn = (index,letter) => grid()[index].innerText = letter;
    const check = (index,letter) => grid()[index].innerText === letter;
    const rem = (index) => grid()[index].innerText ='';
    const endGame =() => {
        let cou1=0;
        let cou2=0;
        const _grid = grid();
        _grid.forEach(ele =>{
              if(ele.innerText === '1')cou1++;
              if(ele.innerText ==='2')cou2++;
        }
        );
        if(cou1<3){
            alert("Player 2 is Winner");
            disable();
        }
        if(cou2<3){
            alert("Player 1 is Winner");
            disable();
        }
        
    }
    const checkVictory = (ele,rm) => {
        let victory=false;
        Gaincombo.forEach(_c => {
            const _grid = grid();
            const seq = [_grid[_c[0]],_grid[_c[1]],_grid[_c[2]]];
            const arr = [_c[0],_c[1],_c[2]];
            if(arr.indexOf(ele)!=-1 && allsame(seq)){
                victory=true;
                if(rm===0){alert("U got a chance to remove other player coin");}
            }

        });
        return victory;
    }
    const go =()=>{disable();enable2();}
    const go2 = () =>{ disable2();enable();
        document.getElementById("show").innerHTML = "Player"+play+" chance";}
        
    const come =()=>{
        if(en===0)disable();
        else disable2();
        enable3();}
    const come2 = () =>{
        disable3();
           enable();
           document.getElementById("show").innerHTML = "Player"+play+" chance";
    }
    const fun = ($event) =>{
        if(check(qNumid($event.target),val)&& checkVictory(qNumid($event.target),1)===false){
            rem(qNumid($event.target));
        }else alert("Invalid move -- can't remove");
        come2();
        
    }
    const fn = ($event) => {
        if(check(qNumid($event.target),'') && (mv[ind].indexOf(qNumid($event.target)) != -1)){
            taketurn(qNumid($event.target),val);
            if(checkVictory(qNumid($event.target),0)){
                if(val==='1')val='2';
                else val='1';
                en=1;come();
            }else{
                go2();
            }
        }else {
            alert("Invalid move --Chance Completed");
            taketurn(ind,val);go2();
        }
    };

    const clickfn= ($event) => {
        if(count[0]>0 && count[0]===count[1]){
            count[0]-=1;
            if(check(qNumid($event.target),'')){
                taketurn(qNumid($event.target),'1');
                if(checkVictory(qNumid($event.target),0)){
                    val='2';play='2';
                    come();
                }else document.getElementById("show").innerHTML = "Player2 chance";

            }
            else {
                alert("NO CHEATING --Chance Completed");
                document.getElementById("show").innerHTML = "Player2 chance";
            } 
            
        }
        else if(count[1]>0 && count[0]<count[1]){
            count[1]-=1;
            if(check(qNumid($event.target),'')){
                taketurn(qNumid($event.target),'2');
                if(checkVictory(qNumid($event.target),0)){
                    val='1';play='1';
                    come();
                } else document.getElementById("show").innerHTML = "Player1 chance";
            }
            else  {
                alert("NO CHEATING --Chance Completed");
                document.getElementById("show").innerHTML = "Player1 chance";
            }
        }
        else if(count[0]===count[1]){
            endGame();
            count[0]-=1;play='2';
            ind=qNumid($event.target);val='1';
            if(check(ind,val)){
                rem(ind);
                go();
            }else {
                alert("NO CHEATING --Chance Completed");
                document.getElementById("show").innerHTML = "Player2 chance";
            }
        }
        else if(count[0]<count[1]){
            endGame();
            count[1]-=1;play='1';
            ind=qNumid($event.target);val='2';
            if(check(ind,val)){
                rem(ind);
                go();
            }else {
                alert("NO CHEATING --Chance Completed");
                document.getElementById("show").innerHTML = "Player1 chance";
            }
        }
    };
    const enable2 = () => grid().forEach(_qe1 => _qe1.addEventListener('click',fn));
    const disable2 = () => grid().forEach(_qe1 => _qe1.removeEventListener('click',fn));
    const enable3 = () => grid().forEach(_qe1 => _qe1.addEventListener('click',fun));
    const disable3 = () => grid().forEach(_qe1 => _qe1.removeEventListener('click',fun));
    const enable = () => grid().forEach(_qe1 => _qe1.addEventListener('click',clickfn));
    const disable = () => grid().forEach(_qe1 => _qe1.removeEventListener('click',clickfn));
    enable();    