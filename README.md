# AI Chat Application

This is a Node.js Express-based chat application where users can interact with various AI models. Users can choose between three AI models (Gemini, Claude, and OpenAI) to chat with, and the application uses WebSockets for real-time communication. The backend makes REST API requests to the selected AI model, and each session’s chat context (user queries, responses, and conversation state) is stored.

## Features

- **User Model Selection**: Users can select one of the three AI models (Gemini, Claude, or OpenAI) for chatting.
- **Real-Time Chat**: Uses WebSocket to enable real-time communication between the client and the server.
- **AI Model Integration**: REST API requests are made to the selected AI model to get responses.
- **Session Management**: Each user session is stored, including user queries, responses, and conversation context.
- **Chat History**: The application maintains the chat context for each session.

## Technologies Used

- **Node.js**: Backend server for handling requests and WebSocket connections.
- **Express.js**: Web framework used for routing and session management.
- **WebSocket**: Enables real-time bidirectional communication between the client and server.
- **REST API**: Backend makes requests to the AI model’s API to generate responses.
- **Gemini, Claude, OpenAI APIs**: Integrates with various AI models for generating responses.
- **Session Management**: Stores each user's session, query, response, and context for the ongoing chat.

## Installation

To set up the application locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-chat-application.git
    cd ai-chat-application
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up your environment variables**:
    - Create a `.env` file in the root of the project.
    - Add your AI model API keys or other necessary configuration like this:
      ```
      GEMINI_API_KEY=your_gemini_api_key
      CLAUDE_API_KEY=your_claude_api_key
      OPENAI_API_KEY=your_openai_api_key
      ```

4. **Run the application**:
    ```bash
    npm start
    ```

    The app will start at `http://localhost:3000`.

## Usage

1. Open the landing page.
2. Select the AI model you wish to chat with (Gemini, Claude, or OpenAI).
3. You will be redirected to the `/startchat` page, where a session will be created.
4. Begin chatting with the selected AI model in real-time.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Make sure to follow the guidelines for contributing and ensure your changes are well-documented.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
