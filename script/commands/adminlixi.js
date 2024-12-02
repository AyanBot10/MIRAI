const axios = require("axios");
const moment = require("moment-timezone");

class Imgur {
  constructor() {
    this.apiKey = "05885e5b8cdceea0d2e4cb9abde3c24e";
    this.client = axios.create({
      baseURL: "https://api.imgur.com/3/",
      headers: {
        Authorization: `Client-ID ${this.apiKey}`
      }
    });
  }

  async uploadImage(url) {
    try {
      const response = await this.client.post("image", { image: url });
      return response.data.data.link;
    } catch (error) {
      console.error("خطأ أثناء رفع الصورة:", error.message);
      throw new Error("تعذر رفع الصورة، تحقق من الرابط.");
    }
  }
}

class Modules extends Imgur {
  constructor() {
    super();
  }

  get config() {
    return {
      name: "رفع",
      version: "2.0.0",
      hasPermssion: 0,
      credits: "🥷MOHAMED🇦🇱X🇦🇱ZINO🥷",
      usePrefix: false,
      description: "تحويل صورة إلى رابط باستخدام Imgur",
      commandCategory: "خدمات",
      usages: "رد على صورة",
      cooldowns: 5
    };
  }

  run = async ({ api, event }) => {
    try {
      const startTime = Date.now();

      if (event.type !== "message_reply" || !event.messageReply.attachments.length) {
        return api.sendMessage(
          "⚠️ الرجاء الرد على صورة لتحويلها إلى رابط.",
          event.threadID,
          event.messageID
        );
      }

      const attachments = event.messageReply.attachments.filter(att => att.type === "photo");
      if (attachments.length === 0) {
        return api.sendMessage(
          "⚠️ هذا الأمر يدعم فقط الصور، الرجاء الرد على صورة.",
          event.threadID,
          event.messageID
        );
      }

      const links = [];
      for (let { url } of attachments) {
        const link = await this.uploadImage(url);
        links.push(link);
      }

      const userInfo = await api.getUserInfo(event.senderID);
      const userName = userInfo[event.senderID]?.name || "مستخدم غير معروف";

      const endTime = Date.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(2);
      const currentTime = moment.tz("Africa/Algiers").format("YYYY-MM-DD HH:mm:ss");

      const message = `
🖼️ === 『 تم الرفع بنجاح 』 === 🖼️
━━━━━━━━━━━━━━━━━━
${links.join("\n")}
━━━━━━━━━━━━━━━━━━
👤 المرسل: ${userName}
      `.trim();

      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error("خطأ أثناء التنفيذ:", error.message);
      return api.sendMessage(
        "❌ حدث خطأ أثناء رفع الصورة. يرجى المحاولة لاحقًا.",
        event.threadID,
        event.messageID
      );
    }
  };
}

module.exports = new Modules();
