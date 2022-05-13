// 
let emptyEmailMsg = document.querySelector(".email-empty-errmsg")
let invalidEmailMsg = document.querySelector(".email-invalid-errmsg")

let closeSuccess = document.querySelector(".close-success-msg");
let gotIt = document.querySelector(".got-it");
let closeMultipleSubmission = document.querySelector(".close-multiple-success-msg");
let gotItMultipleSubmission = document.querySelector(".got-it-multiple");
let emailModal = document.querySelector(".email-success");
let emailMultipleModal = document.querySelector(".multiple-success");
let loadingIcon = document.querySelector(".loading");
let ntfBtn = document.querySelector('.ntf-btn');
let errFeedback = document.querySelector('.notification-feedback');
let closeErr= document.querySelector('.close-err');
  
let smNavItems = document.querySelectorAll('.sm-nav-item');


  
// notify email 
document.getElementById('notify-email-btn').addEventListener('click', (e) => {
	e.preventDefault();
	let clickedEle = e.target; 
	
    let emailValue = document.getElementById('notify-email').value.trim();
	//    console.log(notifyEmailValue);
	if(emailValue === ""){ 
		invalidEmailMsg.classList.remove("show"); 
		emptyEmailMsg.classList.add("show");
	}else {
		if(ValidateEmail(emailValue)) {
			loadingIcon.classList.add('active')
			ntfBtn.innerText =  'submitting'
			clickedEle.disabled = true; 
			fetchData(emailValue, loadingIcon, ntfBtn, clickedEle)
		} else {
			emptyEmailMsg.classList.remove("show");
			invalidEmailMsg.classList.add("show");
		}
	}

	
})
document.getElementById('notify-email-btn').addEventListener('focus', (e) => {
    e.preventDefault();
    emptyEmailMsg.classList.remove("show");
	invalidEmailMsg.classList.remove("show");
})

function ValidateEmail(email) {
	if (
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		)
	) { 
		return true;
	}
	return false; 
} 

async function fetchData(notifyEmailValue, loadingIcon, ntfbtn, clickedEle) {
    const url = "https://sako-email.herokuapp.com/api/v1/email/";
    const apiData = {
        email: notifyEmailValue,
    };
    try {
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json; charset=UTF-8",
            },
            mode: "cors",
            // credentials: "include",
            body: JSON.stringify(apiData),
        })
        let data = await response.json() 
        // console.log("submitted:", data);
        if (data.status_code === 200 || data.status_code === 201) {
			// console.log('successfull'); 
			emailModal.classList.add('active')
			loadingIcon.classList.remove('active')
			ntfBtn.innerText = 'Notify Me'
			clickedEle.disabled = false;
			clearForm();
        }else if (data.status_code === 400) {
			emailMultipleModal.classList.add("active");
			loadingIcon.classList.remove("active");
			ntfBtn.innerText = "Notify Me";
			clickedEle.disabled = false;
			clearForm(); 
		}
 
    }catch (err){
		// console.log("Error:", err);
		errFeedback.classList.add("show-feedback");
		loadingIcon.classList.remove("active");
		ntfBtn.innerText = "Notify Me";
		clickedEle.disabled = false;
    };
}

function clearForm() {
	document.getElementById("getEmail").reset(); 
} 


let smMenuBtn = document.querySelector(".sm-menu-btn"); 
let smNav = document.querySelector(".sm-nav"); 
smMenuBtn.addEventListener('click', e => {

	e.preventDefault(); 
	e.stopPropagation();
	let clickedEle = e.target 
	smNav.classList.toggle('show')
	clickedEle.classList.toggle('active')
}) 
  
// 
let questions = document.querySelectorAll('.question-header'); 
let answers = document.querySelectorAll('.answer'); 

document.addEventListener('click', e => { 
	let clickedEle = e.target;  
	
	if (e.target.classList.contains("question-header")) { 

		if(e.target.classList.contains('active')) {
			clickedEle.classList.toggle("active");
			clickedEle.nextElementSibling.classList.toggle("active");
			return false
		}

		questions.forEach((question) => {
			question.classList.remove("active");
			question.nextElementSibling.classList.remove("active");
		});

		clickedEle.classList.toggle('active') 
		clickedEle.nextElementSibling.classList.toggle('active')
	}    
}) 

// design process content 
  let deliverySteps = document.querySelectorAll(".step");
  deliverySteps.forEach(step => { 
    step.addEventListener('click', e => {
		e.stopPropagation();
      removeActiveClass() 
      addActiveClass(e.target) 
    //   updateDeliveryProcess(e.target.getAttribute("data-id"));
    }) 
  })

//remove active class from all process
function removeActiveClass() {
  deliverySteps.forEach(step => {
    if(step.classList.contains('sako-active-step')) {
      step.classList.remove('sako-active-step', 'shadow-2xl'); 
    }  
    else {
      return false
    }
  })
}

//add active class to clicked process
function addActiveClass(ele) {
   if (ele.classList.contains("sako-active-step")) {
     return false; 
   } else { 
     ele.classList.add('sako-active-step', 'shadow-2xl');
   }  
}



// design process content
let deliveryStepsContent = [
  {
    id: 1,
    imgSrc: "/assets/images/",
    iconSrc: "brief.svg"
  },
  {
    id: 1,
    imgSrc: "/assets/images/",
    text: "brief.svg"
  },
  {
    id: 1,
    imgSrc: "/assets/images/",
    text: "brief.svg"
  }
  
];

//update design process content
function updateDeliveryProcess(dataId) {
  let content = deliveryStepsContent[dataId - 1] 
  const {id, imgSrc, text} = content
   
  let deliveryProcessContent = `
  <span class="flex justify-center icon w-20 h-20 bg-sec-light mb-12 rounded-lg">
  <img src="assets/${iconSrc}" alt=""> </span>
  <h1 class="mb-4 font-bold text-pri text-xl">${title}</h1>  
  <p class="text-gray-700 text-sm lg:text-lg leading-relaxed">${text}</p>
  `;

  renderContent(designProcessContent)
}

//render/inject content into dom
function renderContent(content) {
  document.querySelector('.process-content').innerHTML = content
} 

let sakoPrices = document.querySelectorAll('.sako-price')
sakoPrices.forEach( price => {
	let plansId = ['sub-plans', 'one-time']
	price.addEventListener('click', e => {
		if(e.target.classList.contains('active')) {
			return false
		} else {
			sakoPrices.forEach(price => {
				price.classList.remove('active')
				let ele = e.target.getAttribute("data-id");
				showPlan(ele, plansId);
			})  
			e.target.classList.add('active') 
		}  
		; 
	})
}) 

function showPlan(ele, plansId) {
	// console.log(ele);
	plansId.forEach(planId => {
		document.getElementById(planId).classList.remove('active')
	})
	document.getElementById(ele).classList.add("active");
}    
 
let commentsNext = document.querySelector('.comment-next');
let commentsPrev = document.querySelector('.comment-prev');
let commentImgs = document.querySelectorAll('.comment-img');
let commentCounter = 2  
let commentCap = 3

commentsNext.addEventListener('click', e => {
	if(commentCounter >= commentCap ) {
		commentCounter = 1
		showNextComment(commentCounter);
		showImg(commentCounter) 
	}else {  
		commentCounter++
		showNextComment(commentCounter)
		showImg(commentCounter); 
	}  
})
 
commentsPrev.addEventListener('click', e => {
	if(commentCounter <= 1 ) {
		commentCounter = 3
		showPrevComment(commentCounter);
		showImg(commentCounter); 
	}else {    
		commentCounter--
		showPrevComment(commentCounter)
		showImg(commentCounter);
	} 
})

let comments = document.querySelectorAll('.comment')
function showNextComment(counterState) { 
	comments.forEach(comment => {
		comment.classList.remove("active");
	});  
	let commentToShow = document.querySelector(`.comment-${counterState}`)
	commentToShow.classList.add('active') 
}  
   
function showPrevComment(counterState) {
	comments.forEach((comment) => { 
		comment.classList.remove("active");
	});
	let commentToShow = document.querySelector(`.comment-${counterState}`);
	commentToShow.classList.add("active");
}
 
function showImg(counterState) {
	commentImgs.forEach((img) => {
		img.classList.remove("active");
	});
	let commentToShow = document.querySelector(`.comment-img-${counterState}`);
	commentToShow.classList.add("active");
}  

closeSuccess.addEventListener('click', e => {
	emailModal.classList.remove('active')
})
gotIt.addEventListener('click', e => {
	emailModal.classList.remove('active')
})
closeMultipleSubmission.addEventListener("click", (e) => {
	emailMultipleModal.classList.remove("active");
});
gotItMultipleSubmission.addEventListener("click", (e) => {
	emailMultipleModal.classList.remove("active");
});
closeErr.addEventListener("click", (e) => {
	errFeedback.classList.remove("show-feedback");
});
 
smNavItems.forEach( item => {
	item.addEventListener('click',  e => {
		e.preventDefault()
		smNav.classList.toggle("show");
		smMenuBtn.classList.toggle("active");
	}) 
})