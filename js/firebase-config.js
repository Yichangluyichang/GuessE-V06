/**
 * Firebase 配置文件
 * 包含 Firebase 初始化和基础配置
 */

// Firebase 配置信息
const firebaseConfig = {
    apiKey: "AIzaSyDZiE27_pWzxTRtNFTNMA54xNBXXof3DXE",
    authDomain: "guesse-81748.firebaseapp.com",
    databaseURL: "https://guesse-81748-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "guesse-81748",
    storageBucket: "guesse-81748.firebasestorage.app",
    messagingSenderId: "706697908529",
    appId: "1:706697908529:web:22467cbd8e398ad51ce010",
    measurementId: "G-32L5V7RWKP"
};

// 初始化 Firebase
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDatabase = null;

/**
 * 初始化 Firebase 服务
 */
function initializeFirebase() {
    try {
        // 检查 Firebase SDK 是否已加载
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK 未加载');
            return false;
        }

        // 初始化 Firebase
        if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(firebaseConfig);
        } else {
            firebaseApp = firebase.app();
        }

        // 初始化服务
        firebaseAuth = firebase.auth();
        firebaseDatabase = firebase.database();

        console.log('Firebase 初始化成功');
        return true;
    } catch (error) {
        console.error('Firebase 初始化失败:', error);
        return false;
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.firebaseConfig = firebaseConfig;
    window.initializeFirebase = initializeFirebase;
    window.getFirebaseAuth = () => firebaseAuth;
    window.getFirebaseDatabase = () => firebaseDatabase;
}
