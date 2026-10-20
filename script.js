// --- 優雅的 Toast 提示功能 ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgColor = type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-beige-800 text-beige-50 border-beige-900';
    const icon = type === 'error' 
        ? '<svg class="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        : '<svg class="w-5 h-5 mr-2 text-beige-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';

    toast.className = `flex items-center px-6 py-3 rounded-full shadow-xl border ${bgColor} font-medium text-sm toast-enter pointer-events-auto`;
    toast.innerHTML = `${icon} ${message}`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.replace('toast-enter', 'toast-leave');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

// --- 狀態管理 ---
let works = [
    {
        id: 1,
        name: "陳靜雅",
        studentId: "11200001",
        intro: "保留材質本色，傳遞溫暖手感。",
        imageUrl: "https://placehold.co/800x500/E6DED5/4A3F35?font=playfair-display&text=Minimalist+Concept",
        votes: 0
    },
    {
        id: 2,
        name: "林宇軒",
        studentId: "11200002",
        intro: "結構與留白的幾何平衡。",
        imageUrl: "https://placehold.co/800x500/D4C3B3/2E261F?font=playfair-display&text=Geometric+Space",
        votes: 0
    },
    {
        id: 3,
        name: "張若涵",
        studentId: "11200003",
        intro: "回歸古典襯線體的優雅排版。",
        imageUrl: "https://placehold.co/800x500/F0E7DB/6B5744?font=playfair-display&text=Classic+Typography",
        votes: 0
    }
];

let totalVotes = 0;

// --- DOM 元素 ---
const exhibitionGrid = document.getElementById('exhibition-grid');
const voteOptions = document.getElementById('vote-options');
const rankingList = document.getElementById('ranking-list');
const totalVotesCount = document.getElementById('total-votes-count');
const fileInput = document.getElementById('submit-image');
const fileNameDisplay = document.getElementById('file-name-display');
const selectedCountDisplay = document.getElementById('selected-count');

// 處理檔名顯示
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        fileNameDisplay.textContent = e.target.files[0].name;
        fileNameDisplay.classList.add('text-beige-800', 'font-bold');
    } else {
        fileNameDisplay.textContent = '點擊或拖曳上傳圖片';
        fileNameDisplay.classList.remove('text-beige-800', 'font-bold');
    }
});

// --- 渲染函數 ---
function renderAll() {
    renderExhibition();
    renderVoteOptions();
    renderRanking();
}

function renderExhibition() {
    exhibitionGrid.innerHTML = '';
    works.forEach((work, index) => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-[1.5rem] p-4 shadow-sm border border-beige-100 hover:shadow-elegant transition-all duration-300 flex flex-col group fade-in";
        card.style.animationDelay = `${index * 0.1}s`; // 已修復語法錯誤
        card.innerHTML = `
            <div class="h-56 overflow-hidden rounded-xl bg-beige-50 relative mb-5">
                <img src="${work.imageUrl}" alt="${work.name}的作品" class="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700">
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur text-beige-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center border border-beige-100">
                    <svg class="w-3.5 h-3.5 mr-1 text-beige-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
                    ${work.votes}
                </div>
            </div>
            <div class="px-2 flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-serif font-bold text-beige-900">${work.name}</h3>
                    <span class="text-xs text-beige-400 font-medium">ID: ${work.studentId}</span>
                </div>
                <p class="text-sm text-beige-600 font-light mt-auto leading-relaxed border-t border-beige-100 pt-3">「${work.intro}」</p>
            </div>
        `;
        exhibitionGrid.appendChild(card);
    });
}

function updateVoteCount() {
    const checkedCount = document.querySelectorAll('.vote-checkbox:checked').length;
    selectedCountDisplay.textContent = checkedCount;
    
    // 視覺提示
    const checkboxes = document.querySelectorAll('.vote-checkbox');
    checkboxes.forEach(cb => {
        const label = cb.closest('label');
        if (!cb.checked && checkedCount >= 3) {
            cb.disabled = true;
            label.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            cb.disabled = false;
            label.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        
        // 選中狀態的邊框高亮
        if(cb.checked) {
            label.classList.add('border-beige-500', 'bg-beige-50/50');
            label.classList.remove('border-transparent');
        } else {
            label.classList.remove('border-beige-500', 'bg-beige-50/50');
            label.classList.add('border-transparent');
        }
    });
}

function renderVoteOptions() {
    voteOptions.innerHTML = '';
    works.forEach(work => {
        const label = document.createElement('label');
        label.className = "flex items-center p-3 rounded-xl hover:bg-beige-50 cursor-pointer transition border border-transparent";
        label.innerHTML = `
            <div class="relative flex items-center justify-center mr-4">
                <input type="checkbox" name="vote-item" value="${work.id}" class="peer appearance-none w-6 h-6 border-2 border-beige-300 rounded focus:ring-2 focus:ring-beige-400 focus:outline-none checked:bg-beige-600 checked:border-beige-600 transition-colors vote-checkbox cursor-pointer">
                <svg class="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <img src="${work.imageUrl}" class="w-12 h-12 object-cover rounded-lg shadow-sm mr-4 border border-beige-100">
            <div class="flex-1 min-w-0">
                <h4 class="font-serif font-bold text-beige-900 truncate">${work.name}</h4>
                <p class="text-xs text-beige-500 truncate">${work.intro}</p>
            </div>
        `;
        voteOptions.appendChild(label);
    });

    const checkboxes = document.querySelectorAll('.vote-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateVoteCount);
    });
    updateVoteCount(); // 初始化狀態
}

function renderRanking() {
    rankingList.innerHTML = '';
    totalVotesCount.textContent = totalVotes;

    const sortedWorks = [...works].sort((a, b) => b.votes - a.votes).slice(0, 3);
    const medals = ['Top 1', 'Top 2', 'Top 3'];
    const rankColors = ['text-yellow-600', 'text-slate-500', 'text-amber-700'];

    sortedWorks.forEach((work, index) => {
        if (work.votes === 0 && index !== 0) return; // 沒票不顯示二三名

        const card = document.createElement('div');
        card.className = `bg-white rounded-[2rem] p-6 border border-beige-200 shadow-sm hover:shadow-elegant transition flex flex-col items-center text-center relative mt-6 fade-in`;
        card.style.animationDelay = `${index * 0.15}s`; // 已修復語法錯誤
        
        card.innerHTML = `
            <div class="absolute -top-5 bg-beige-800 text-beige-50 font-serif font-bold text-sm tracking-wider px-6 py-1.5 rounded-full shadow-md uppercase">
                ${medals[index]}
            </div>
            <div class="w-28 h-28 mt-4 mb-4 rounded-full p-1 border border-beige-200">
                <img src="${work.imageUrl}" class="w-full h-full object-cover rounded-full">
            </div>
            <h3 class="font-serif font-bold text-xl text-beige-900 mb-1">${work.name}</h3>
            <p class="text-3xl font-serif font-black text-beige-600 my-3 flex items-baseline gap-1">
                ${work.votes} <span class="text-sm font-sans font-normal text-beige-400">Votes</span>
            </p>
            <button onclick="openCertificate('${work.name}', '${work.studentId}', ${index + 1})" class="mt-auto px-5 py-2.5 bg-beige-50 border border-beige-300 text-beige-700 rounded-xl hover:bg-beige-100 hover:text-beige-900 font-medium text-sm w-full transition flex justify-center items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                預覽獎狀
            </button>
        `;
        rankingList.appendChild(card);
    });
}

// --- 互動邏輯 ---

// 投稿
document.getElementById('submit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('submit-name').value;
    const studentId = document.getElementById('submit-id').value;
    const intro = document.getElementById('submit-intro').value;
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newWork = {
                id: Date.now(),
                name: name,
                studentId: studentId,
                intro: intro,
                imageUrl: event.target.result,
                votes: 0
            };
            works.unshift(newWork);
            renderAll();
            document.getElementById('submit-form').reset();
            fileNameDisplay.textContent = '點擊或拖曳上傳圖片';
            fileNameDisplay.classList.remove('text-beige-800', 'font-bold');
            showToast('作品發布成功！已展示於畫廊。');
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});

// 投票
document.getElementById('vote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const voterName = document.getElementById('voter-name').value;
    const checkedBoxes = document.querySelectorAll('.vote-checkbox:checked');
    
    if (checkedBoxes.length === 0) {
        showToast('請至少選擇一件喜歡的作品。', 'error');
        return;
    }

    let votedCount = 0;
    checkedBoxes.forEach(cb => {
        const workId = parseInt(cb.value);
        const workIndex = works.findIndex(w => w.id === workId);
        if (workIndex !== -1) {
            works[workIndex].votes += 1;
            votedCount++;
            totalVotes++;
        }
    });

    renderAll();
    document.getElementById('vote-form').reset();
    updateVoteCount();
    showToast(`感謝 ${voterName} 的支持！已成功投下 ${votedCount} 票。`);
});

// --- 獎狀功能 ---
const certModal = document.getElementById('certificate-modal');
const certModalContent = document.getElementById('cert-modal-content');

function openCertificate(name, studentId, rank) {
    document.getElementById('cert-name').textContent = name;
    document.getElementById('cert-id').textContent = studentId;
    document.getElementById('cert-rank').textContent = `第 ${rank} 名`;
    
    const today = new Date();
    document.getElementById('cert-date').textContent = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
    
    certModal.classList.remove('hidden');
    // 觸發進場動畫
    setTimeout(() => {
        certModalContent.classList.remove('scale-95');
        certModalContent.classList.add('scale-100');
    }, 10);
}

function closeCertificate() {
    certModalContent.classList.remove('scale-100');
    certModalContent.classList.add('scale-95');
    setTimeout(() => {
        certModal.classList.add('hidden');
    }, 150);
}

// 初始化
renderAll();