import firebase from 'firebase';
import uuid from 'uuid';

export function addArticle({ file, content, userId, userDisplayName, userProfileUrl }) {

    const filename = uuid.v1();
    const extension = file.name.split('.').pop();
    const url = `articles/${filename}.${extension}`;

    const articleRef = firebase.storage().ref().child(url);
    return articleRef.put(file)
        .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
        })
        .then((downloadUrl) => {
            const articleId = uuid.v1();
            return firebase.firestore().collection('articles').doc(articleId).set({
                id: articleId,
                downloadUrl,
                content,
                userId,
                userDisplayName,
                userProfileUrl,
                likeCnt: 0,
                commentCnt: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                displayTimestamp: new Date().toDateString().substring(0, 10)
            });
        })

}


export function getArticleList(lastItem, count) {
    const limitCount = count || 30;

    if (lastItem) {
        return firebase.firestore().collection("articles")
            .orderBy("createdAt", "desc")
            .startAfter(lastItem)
            .limit(limitCount)
            .get()
    } else {
        return firebase.firestore().collection("articles")
            .orderBy("createdAt", "desc")
            .limit(limitCount)
            .get()
    }

}