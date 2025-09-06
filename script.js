 // DOM Elements
const newsFeed = document.getElementById('newsFeed');
const trendingNews = document.getElementById('trendingNews');
const postForm = document.getElementById('postForm');
const loginForm = document.getElementById('loginForm');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginAdminBtn = document.getElementById('loginAdmin');
const adminFab = document.getElementById('adminFab');
const adminDrawer = document.getElementById('adminDrawer');
const adminClose = document.getElementById('adminClose');
const formMessage = document.getElementById('formMessage');
const loginMessage = document.getElementById('loginMessage');
const postImage = document.getElementById('postImage');
const imagePreview = document.getElementById('imagePreview');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

// New elements for logout functionality
const userMenu = document.getElementById('userMenu');
const userMenuButton = document.getElementById('userMenuButton');
const userDropdown = document.getElementById('userDropdown');
const userMenuText = document.getElementById('userMenuText');
const userEmail = document.getElementById('userEmail');
const loginMenuItem = document.getElementById('loginMenuItem');
const adminMenuItem = document.getElementById('adminMenuItem');
const logoutMenuItem = document.getElementById('logoutMenuItem');
const dropdownDivider = document.getElementById('dropdownDivider');

// Toggle mobile navigation
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Toggle user dropdown
userMenuButton.addEventListener('click', (e) => {
  e.stopPropagation();
  userMenu.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!userMenu.contains(e.target)) {
    userMenu.classList.remove('open');
  }
});

// Toggle admin drawer
adminFab.addEventListener('click', () => {
  window.location.href="post.html";
});

adminClose.addEventListener('click', () => {
  adminDrawer.classList.remove('open');
});

// Open login modal from dropdown
loginMenuItem.addEventListener('click', () => {
  window.location.href="login.html"
});

// Open admin panel from dropdown
adminMenuItem.addEventListener('click', () => {
  window.location.href="dashboard.html";
  userMenu.classList.remove('open');
});

// Close login modal
closeLoginModal.addEventListener('click', () => {
  loginModal.classList.remove('open');
});

// Open login modal from admin panel
loginAdminBtn.addEventListener('click', () => {
  loginModal.classList.add('open');
});

// Image preview
postImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:100%">`;
      imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});

// Format date to Bengali
function formatBengaliDate(timestamp) {
  const date = timestamp.toDate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('bn-BD', options);
}

// Update UI based on authentication state
function updateUI(user) {
  if (user) {
    // User is signed in
    userMenuText.textContent = 'লগআউট'; // only show logout in navbar
    loginMenuItem.classList.add('hidden'); // hide login
    logoutMenuItem.classList.remove('hidden'); // show logout
    dropdownDivider.classList.add('hidden'); // hide divider if not needed
    
    // Show admin post option (the drawer toggle)
    adminMenuItem.classList.remove('hidden'); // show admin post
    adminFab.style.display = 'flex'; // show FAB if you still use it
  } else {
    // User is signed out
    userMenuText.textContent = 'লগইন';
    loginMenuItem.classList.remove('hidden'); // show login
    logoutMenuItem.classList.add('hidden'); // hide logout
    dropdownDivider.classList.add('hidden');
    adminMenuItem.classList.add('hidden'); // hide admin post option
    adminFab.style.display = 'none'; // hide FAB
    adminDrawer.classList.remove('open'); // close drawer if open
  }
}

// Logout functionality
logoutMenuItem.addEventListener('click', () => {
  auth.signOut().then(() => {
    // Sign-out successful
    userMenu.classList.remove('open');
    console.log('User signed out');
  }).catch((error) => {
    console.error('Sign out error:', error);
  });
});

// Load news feed
async function loadNewsFeed() {
  try {
    const querySnapshot = await db.collection('news')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    newsFeed.innerHTML = '';
    
    if (querySnapshot.empty) {
      newsFeed.innerHTML = `
        <div class="card">
          <div class="card-body text-center">
            <p>কোনো খবর পাওয়া যায়নি। প্রথম খবরটি পোস্ট করুন!</p>
          </div>
        </div>
      `;
      return;
    }
    
    querySnapshot.forEach((doc, index) => {
      const news = doc.data();
      const isFirst = index === 0;
      
      if (isFirst) {
        newsFeed.innerHTML += `
          <article class="card card-large">
            <img class="thumb" src="${news.imageUrl}" alt="${news.title}">
            <div class="card-body">
              <span class="category-tag">${news.category}</span>
              <h2 class="title">${news.title}</h2>
              <p class="excerpt">${news.excerpt}</p>
              <div class="meta">
                <span>${news.source || 'আজকের পত্রিকা'}</span>
                <span class="meta-dot"></span>
                <span>${formatBengaliDate(news.createdAt)}</span>
              </div>
            </div>
          </article>
        `;
      } else {
        newsFeed.innerHTML += `
          <article class="card">
            <img class="thumb" src="${news.imageUrl}" alt="${news.title}">
            <div class="card-body">
              <span class="category-tag">${news.category}</span>
              <h2 class="title">${news.title}</h2>
              <p class="excerpt">${news.excerpt}</p>
              <div class="meta">
                <span>${news.source || 'আজকের পত্রিকা'}</span>
                <span class="meta-dot"></span>
                <span>${formatBengaliDate(news.createdAt)}</span>
              </div>
            </div>
          </article>
        `;
      }
    });
  } catch (error) {
    console.error('Error loading news:', error);
    newsFeed.innerHTML = `
      <div class="card">
        <div class="card-body text-center">
          <p>খবর লোড করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।</p>
        </div>
      </div>
    `;
  }
}

// Load trending news

async function loadNewsFeed() {
  try {
    const querySnapshot = await db.collection('news')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    newsFeed.innerHTML = '';
    
    if (querySnapshot.empty) {
      newsFeed.innerHTML = `
        <div class="card">
          <div class="card-body text-center">
            <p>কোনো খবর পাওয়া যায়নি। প্রথম খবরটি পোস্ট করুন!</p>
          </div>
        </div>
      `;
      return;
    }
    
    querySnapshot.forEach((doc, index) => {
      const news = doc.data();
      const isFirst = index === 0;

      // Ensure we have postId for the link
      const postId = doc.id; // Firestore document ID
      
      if (isFirst) {
        newsFeed.innerHTML += `
          <article class="card card-large">
            <img class="thumb" src="${news.imageUrl}" alt="${news.title}">
            <div class="card-body">
              <span class="category-tag">${news.category}</span>
              <h2 class="title">${news.title}</h2>
              <p class="excerpt">${news.excerpt}</p>
              <div class="meta">
                <span>${news.source || 'আজকের পত্রিকা'}</span>
                <span class="meta-dot"></span>
                <span>${formatBengaliDate(news.createdAt)}</span>
              </div>
              <!-- Full post link added -->
              <a href="open.html?postId=${postId}" class="btn btn-primary mt-2">পুরো পোস্ট দেখুন</a>
            </div>
          </article>
        `;
      } else {
        newsFeed.innerHTML += `
          <article class="card">
            <img class="thumb" src="${news.imageUrl}" alt="${news.title}">
            <div class="card-body">
              <span class="category-tag">${news.category}</span>
              <h2 class="title">${news.title}</h2>
              <p class="excerpt">${news.excerpt}</p>
              <div class="meta">
                <span>${news.source || 'আজকের পত্রিকা'}</span>
                <span class="meta-dot"></span>
                <span>${formatBengaliDate(news.createdAt)}</span>
              </div>
              <!-- Full post link added -->
              <a href="open.html?postId=${postId}" class="btn btn-primary mt-2">পুরো পোস্ট দেখুন</a>
            </div>
          </article>
        `;
      }
    });
  } catch (error) {
    console.error('Error loading news:', error);
    newsFeed.innerHTML = `
      <div class="card">
        <div class="card-body text-center">
          <p>খবর লোড করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।</p>
        </div>
      </div>
    `;
  }
}
// Admin login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    loginMessage.textContent = 'লগইন সফল! আপনি এখন পোস্ট করতে পারবেন।';
    loginMessage.classList.remove('error', 'hidden');
    loginMessage.classList.add('success');
    
    setTimeout(() => {
      loginModal.classList.remove('open');
    }, 1500);
  } catch (error) {
    loginMessage.textContent = `লগইন ব্যর্থ: ${error.message}`;
    loginMessage.classList.remove('success', 'hidden');
    loginMessage.classList.add('error');
  }
});

// Create new post
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Check if user is logged in
  const user = auth.currentUser;
  if (!user) {
    formMessage.textContent = 'পোস্ট করতে আপনাকে প্রথমে লগইন করতে হবে।';
    formMessage.classList.remove('success', 'hidden');
    formMessage.classList.add('error');
    return;
  }
  
  const title = document.getElementById('postTitle').value;
  const category = document.getElementById('postCategory').value;
  const excerpt = document.getElementById('postExcerpt').value;
  const source = document.getElementById('postSource').value;
  const author = document.getElementById('postAuthor').value;
  const file = postImage.files[0];

  try {
    let imageUrl = '';
    if (file) {
      // Upload image to Firebase Storage
      const storageRef = storage.ref(`news/${Date.now()}_${file.name}`);
      await storageRef.put(file);
      imageUrl = await storageRef.getDownloadURL();
    }

    // Save post in Firestore
    await db.collection('news').add({
      title,
      category,
      excerpt,
      source,
      author,
      imageUrl: imageUrl || 'https://via.placeholder.com/600x400?text=No+Image',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      views: 0
    });

    formMessage.textContent = 'পোস্ট সফলভাবে যোগ হয়েছে!';
    formMessage.classList.remove('error', 'hidden');
    formMessage.classList.add('success');

    // Clear form
    postForm.reset();
    imagePreview.classList.add('hidden');

    // Reload feeds
    loadNewsFeed();
    loadTrendingNews();

  } catch (error) {
    console.error('Error adding post:', error);
    formMessage.textContent = `পোস্ট করতে ব্যর্থ: ${error.message}`;
    formMessage.classList.remove('success', 'hidden');
    formMessage.classList.add('error');
  }
});


// Auth state observer
auth.onAuthStateChanged((user) => {
  updateUI(user);
});

// Initial load
loadNewsFeed();
loadTrendingNews();
const trendingNewsContainer = document.getElementById('trendingNews');

function loadTrendingNews() {
  db.collection('posts')
    .orderBy('views', 'desc')
    .limit(5)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        trendingNewsList.innerHTML = '<li>জনপ্রিয় খবর নেই।</li>';
        return;
      }
      
      trendingNewsList.innerHTML = ''; // ক্লিয়ার
      snapshot.forEach(doc => {
        const post = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `<a href="post.html?id=${doc.id}">${post.title}</a>`;
        trendingNewsList.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Trending news load error:', err);
      trendingNewsList.innerHTML = '<li>জনপ্রিয় খবর লোড করতে সমস্যা হয়েছে।</li>';
    });
}

// Page load এ কল করুন
window.addEventListener('DOMContentLoaded', loadTrendingNews);

// Call it to load trending news
loadTrendingNews();
  // Marquee elements select
// Marquee element selection

const marqueeText = document.getElementById("breakingNewsText");

// Firebase Database reference
const marqueeRef = firebase.database().ref("marquee");

// রিয়েলটাইমে মান শুনুন
const marqueeWrapper = document.getElementById("breakingNewsWrapper");

marqueeRef.on("value", snapshot => {
  const data = snapshot.val();
  if (data) {
    if (data.isOn) {
      marqueeWrapper.style.display = "block";
      marqueeWrapper.innerHTML = `<marquee behavior="scroll" direction="left" scrollamount="5" onmouseover="this.stop();" onmouseout="this.start();">${data.text}</marquee>`;
    } else {
      marqueeWrapper.style.display = "none";
    }
  }
});

// Page load এ ট্রেন্ডিং নিউজ কল করুন
window.addEventListener('DOMContentLoaded', () => {
  loadTrendingNews();
});
// ----------------------------
// Trending news loader
// ----------------------------
function loadTrendingNews() {
  const trendingNewsList = document.getElementById('trendingNews');
  db.collection('posts')
    .orderBy('views', 'desc') // জনপ্রিয়তা অনুযায়ী
    .limit(5)
    .get()
    .then(snapshot => {
      trendingNewsList.innerHTML = ''; // পূর্বের লিস্ট ক্লিয়ার
      if (snapshot.empty) {
        trendingNewsList.innerHTML = '<li>জনপ্রিয় খবর নেই।</li>';
        return;
      }
      snapshot.forEach(doc => {
        const post = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `<a href="post.html?id=${doc.id}">${post.title}</a>`;
        trendingNewsList.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Trending news load error:', err);
      trendingNewsList.innerHTML = '<li>জনপ্রিয় খবর লোড করতে সমস্যা হয়েছে।</li>';
    });
}

// Page load এ কল করুন
window.addEventListener('DOMContentLoaded', loadTrendingNews);
document.addEventListener('DOMContentLoaded', () => {
  const trendingNewsList = document.getElementById('trendingNews');
  if (!trendingNewsList) {
    console.error('Error: #trendingNews element not found!');
    return;
  }
  
  db.collection('posts')
    .orderBy('views', 'desc')
    .limit(5)
    .get()
    .then(snapshot => {
      trendingNewsList.innerHTML = '';
      snapshot.forEach(doc => {
        const post = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `<a href="post.html?id=${doc.id}">${post.title}</a>`;
        trendingNewsList.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Trending news load error:', err);
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const trendingNewsList = document.getElementById('trendingNews');

  if (!trendingNewsList) {
    console.error('Error: #trendingNews element not found!');
    return;
  }

  // Firebase থেকে trending news load
  db.collection('posts')
    .orderBy('views', 'desc') // জনপ্রিয়তা অনুযায়ী
    .limit(5)
    .get()
    .then(snapshot => {
      trendingNewsList.innerHTML = ''; // পূর্বের লিস্ট ক্লিয়ার

      if (snapshot.empty) {
        trendingNewsList.innerHTML = '<li>জনপ্রিয় খবর নেই।</li>';
        return;
      }

      snapshot.forEach(doc => {
        const post = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `<a href="post.html?id=${doc.id}">${post.title}</a>`;
        trendingNewsList.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Trending news load error:', err);
      trendingNewsList.innerHTML = '<li>জনপ্রিয় খবর লোড করতে সমস্যা হয়েছে।</li>';
    });
});
// Firebase থেকে জনপ্রিয় পোস্ট লোড করার ফাংশন
async function loadPopularPosts() {
  try {
    const querySnapshot = await db.collection('news')
      .orderBy('views', 'desc') // ভিউ কাউন্টের ভিত্তিতে সাজানো
      .limit(5) // শুধুমাত্র শীর্ষ ৫টি পোস্ট
      .get();
    
    const popularPostsContainer = document.getElementById('popularPosts');
    popularPostsContainer.innerHTML = '';
    
    if (querySnapshot.empty) {
      popularPostsContainer.innerHTML = '<li>কোনো জনপ্রিয় খবর পাওয়া যায়নি</li>';
      return;
    }
    
    querySnapshot.forEach((doc) => {
      const news = doc.data();
      const postId = doc.id;
      
      // বাংলা তারিখ ফরম্যাট করার ফাংশন
      const formattedDate = formatBengaliDate(news.createdAt);
      
      popularPostsContainer.innerHTML += `
        <li>
          <a href="open.html?postId=${postId}" style="color: #333; text-decoration: none;">
            <strong>${news.title}</strong>
            <p style="margin: 5px 0; color: #666;">${news.excerpt.substring(0, 80)}...</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <small style="color: #888;">${formattedDate}</small>
              <span style="background: #e53935; display:none; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px;">
                <i class="fas fa-eye"></i> ${news.views || 0}
              </span>
            </div>
          </a>
        </li>
      `;
    });
  } catch (error) {
    console.error('Error loading popular posts:', error);
    const popularPostsContainer = document.getElementById('popularPosts');
    popularPostsContainer.innerHTML = '<li>খবর লোড করতে সমস্যা হচ্ছে</li>';
  }
}

// বাংলা তারিখ ফরম্যাট করার ফাংশন
function formatBengaliDate(timestamp) {
  if (!timestamp) return 'তারিখ নেই';
  
  const date = timestamp.toDate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('bn-BD', options);
}

// পোস্ট খোলার সময় ভিউ কাউন্ট বাড়ানোর ফাংশন
async function incrementViewCount(postId) {
  try {
    const postRef = db.collection('news').doc(postId);
    await postRef.update({
      views: firebase.firestore.FieldValue.increment(1)
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}

// পোস্ট খোলার পেজে (open.html) এই ফাংশনটি কল করুন
// URL প্যারামিটার থেকে postId নিয়ে
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');
if (postId) {
  incrementViewCount(postId);
}

// পেজ লোড হওয়ার সময় জনপ্রিয় পোস্ট লোড করুন
document.addEventListener('DOMContentLoaded', function() {
  loadPopularPosts();
});
async function loadPopularPosts() {
  try {
    const querySnapshot = await db.collection('news')
      .orderBy('views', 'desc')
      .limit(5)
      .get();
    
    const desktopContainer = document.getElementById('popularPosts');
    const mobileContainer = document.getElementById('popularPostsMobile');
    
    desktopContainer.innerHTML = '';
    mobileContainer.innerHTML = '';
    
    if (querySnapshot.empty) {
      const msg = '<li>কোনো জনপ্রিয় খবর পাওয়া যায়নি</li>';
      desktopContainer.innerHTML = msg;
      mobileContainer.innerHTML = msg;
      return;
    }
    
    querySnapshot.forEach((doc, index) => {
      const news = doc.data();
      const postId = doc.id;
      const formattedDate = formatBengaliDate(news.createdAt);
      
      const liHTML = `
        <li>
          <a href="open.html?postId=${postId}" style="color: #333; text-decoration: none;">
            <strong>${news.title}</strong>
            <p style="margin: 5px 0; color: #666;">${news.excerpt.substring(0, 80)}...</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <small style="color: #888;">${formattedDate}</small>
              <span style="background: #e53935; display:none; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px;">
                <i class="fas fa-eye"></i> ${news.views || 0}
              </span>
            </div>
          </a>
        </li>
      `;
      
      desktopContainer.innerHTML += liHTML;
      mobileContainer.innerHTML += liHTML;
    });
  } catch (error) {
    console.error('Error loading popular posts:', error);
    const msg = '<li>খবর লোড করতে সমস্যা হচ্ছে</li>';
    document.getElementById('popularPosts').innerHTML = msg;
    document.getElementById('popularPostsMobile').innerHTML = msg;
  }
}
// Example popular posts (replace with Firebase data if needed)
// Example data
// =======================
// Popular posts (5 + More) Firebase version
// =======================
const initialCount = 5;
let showingAll = false;
const container = document.getElementById("popularPostsMobile");
let popularPosts = [];

// Fetch popular posts from Firebase
async function fetchPopularPosts() {
  try {
    const snapshot = await db.collection('news')
      .orderBy('views', 'desc')
      .get();
    
    popularPosts = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      link: `open.html?postId=${doc.id}`,
      photo: doc.data().imageUrl || 'https://via.placeholder.com/50'
    }));
    
    renderPopularPosts();
  } catch (err) {
    console.error('Error fetching popular posts:', err);
    container.innerHTML = '<li>জনপ্রিয় খবর লোড করতে সমস্যা হয়েছে।</li>';
  }
}

function renderPopularPosts() {
  container.innerHTML = '';
  const count = showingAll ? popularPosts.length : initialCount;
  
  popularPosts.slice(0, count).forEach(post => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '8px';
    
    const img = document.createElement('img');
    img.src = post.photo;
    img.alt = post.title;
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.objectFit = 'cover';
    img.style.marginRight = '10px';
    img.style.borderRadius = '4px';
    
    const a = document.createElement('a');
    a.href = post.link;
    a.textContent = post.title;
    a.style.textDecoration = 'none';
    a.style.color = '#000';
    a.style.flex = '1'; // ensure text uses remaining space
    
    li.appendChild(img);
    li.appendChild(a);
    container.appendChild(li);
  });
  
  if (popularPosts.length > initialCount && !showingAll) {
    const li = document.createElement('li');
    li.style.textAlign = 'center';
    const btn = document.createElement('button');
    btn.textContent = 'More';
    btn.classList.add('more-btn');
    btn.onclick = () => {
      showingAll = true;
      renderPopularPosts();
    };
    li.appendChild(btn);
    container.appendChild(li);
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', fetchPopularPosts);
// Global array to store all posts
let allNewsPosts = [];

// Fetch all news posts from Firebase Firestore
async function fetchAllPosts() {
  try {
    const snapshot = await db.collection('news')
      .orderBy('createdAt', 'desc')
      .get();
    
    allNewsPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    renderPosts(allNewsPosts); // Initial load
  } catch (error) {
    console.error('Error fetching posts:', error);
    newsFeed.innerHTML = '<p>খবর লোড করতে সমস্যা হচ্ছে।</p>';
  }
}

// Render posts function
function renderPosts(posts) {
  const newsFeed = document.getElementById('newsFeed');
  newsFeed.innerHTML = '';
  
  if (!posts.length) {
    newsFeed.innerHTML = '<p>কোনো খবর পাওয়া যায়নি।</p>';
    return;
  }
  
  posts.forEach((news, index) => {
    const postId = news.id;
    const formattedDate = news.createdAt ? news.createdAt.toDate().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'তারিখ নেই';
    
    newsFeed.innerHTML += `
      <article class="card ${index === 0 ? 'card-large' : ''}">
        <img class="thumb" src="${news.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${news.title}">
        <div class="card-body">
          <span class="category-tag">${news.category}</span>
          <h2 class="title">${news.title}</h2>
          <p class="excerpt">${news.excerpt}</p>
          <div class="meta">
            <span>${news.source || 'আজকের পত্রিকা'}</span>
            <span class="meta-dot"></span>
            <span>${formattedDate}</span>
          </div>
          <a href="open.html?postId=${postId}" class="btn btn-primary mt-2">পুরো পোস্ট দেখুন</a>
        </div>
      </article>
    `;
  });
}

// Search functionality
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  
  if (!query) {
    renderPosts(allNewsPosts); // Show all posts if search empty
    return;
  }
  
  const filteredPosts = allNewsPosts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  );
  
  renderPosts(filteredPosts);
});

// Call fetchAllPosts on page load
document.addEventListener('DOMContentLoaded', fetchAllPosts);
// -------------------------------
// Live Section Elements
// -------------------------------
// ----------------------
// Live Section Show
// ----------------------
const liveSection = document.getElementById("liveNewsSection");
const liveWrapper = document.getElementById("liveNewsWrapper");

db.collection("liveNews")
  .orderBy("created", "desc")
  .onSnapshot(snapshot => {
    liveWrapper.innerHTML = "";
    let visible = false;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.active) {
        visible = true;
        const card = `
          <div class="live-card">
            <a href="${data.link}" target="_blank">
              <img src="${data.image}" alt="Live Banner">
            </a>
          </div>`;
        liveWrapper.innerHTML += card;
      }
    });
    
    liveSection.style.display = visible ? "block" : "none";
  });
  // Firebase already initialized in firebase-config.js

const categoryScroll = document.getElementById('categoryScroll');
const allCategoryList = document.getElementById('allCategoryList');
const moreBtn = document.getElementById('moreCategories');
const categoryPosts = document.getElementById('categoryPosts');

let allCategories = [];
let showAll = false;

// Load categories from Firebase Realtime Database
const categoriesRef = firebase.database().ref('categories');
categoriesRef.on('value', snapshot => {
  const data = snapshot.val();
  if (!data) return;
  
  allCategories = Object.values(data);
  renderCategoryButtons();
  renderAllCategoryList();
  
  // Load first category posts initially
  if (allCategories.length) loadCategoryPosts(allCategories[0].name);
});

function renderCategoryButtons() {
  categoryScroll.innerHTML = '';
  const categoriesToShow = allCategories.slice(0, 5);
  categoriesToShow.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    if (index === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('#categoryScroll button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadCategoryPosts(cat.name);
    });
    categoryScroll.appendChild(btn);
  });
  
  moreBtn.style.display = allCategories.length > 5 ? 'inline-block' : 'none';
}

function renderAllCategoryList() {
  allCategoryList.innerHTML = '';
  allCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    btn.addEventListener('click', () => {
      loadCategoryPosts(cat.name);
      allCategoryList.classList.add('hidden');
    });
    allCategoryList.appendChild(btn);
  });
}

// More button click -> show vertical list
moreBtn.addEventListener('click', () => {
  allCategoryList.classList.toggle('hidden');
});

// Load news filtered by category from Firestore
async function loadCategoryPosts(category) {
  try {
    const catName = category.trim().toLowerCase();
    const snapshot = await db.collection('news').get();
    
    const filteredPosts = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(post => post.category && post.category.trim().toLowerCase() === catName)
      .sort((a, b) => {
        const dateA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
        const dateB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
        return dateB - dateA;
      });
    
    categoryPosts.innerHTML = '';
    if (!filteredPosts.length) {
      categoryPosts.innerHTML = `<p>এই ক্যাটাগরিতে কোনো খবর পাওয়া যায়নি।</p>`;
      return;
    }
    
    filteredPosts.forEach(news => {
      const postId = news.id;
      const formattedDate = news.createdAt ? news.createdAt.toDate().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'তারিখ নেই';
      categoryPosts.innerHTML += `
        <div class="card">
          <img src="${news.imageUrl||'https://via.placeholder.com/600x400'}" alt="${news.title}">
          <div class="card-body">
            <span class="category-tag">${news.category}</span>
            <h3>${news.title}</h3>
            <p>${news.excerpt}</p>
            <small>${formattedDate}</small>
            <a href="open.html?postId=${postId}">পুরো পোস্ট দেখুন</a>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error('Error loading posts:', err);
    categoryPosts.innerHTML = `<p>খবর লোড করতে সমস্যা হয়েছে।</p>`;
  }
}


