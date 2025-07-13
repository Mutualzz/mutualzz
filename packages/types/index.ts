export const GatewayOpcodes = {
    Dispatch: 0, // Dispatch opcode, used to send payloads like (message updates, server updates and etc.)
    Heartbeat: 1, // Heartbeat opcode, used to check if the connection is alive
    Identify: 2, // For authentication purposes, used to identify the client to the server
    Resume: 3, // Used to resume a previous session, if the connection was lost
    Reconnect: 4, // Instructs the client to reconnect to the server
    InvalidSession: 5, // Indicates that the session is invalid or expired
    Hello: 6, // Sent by the server to initiate the connection and provide the heartbeat interval
    HeartbeatAck: 7, // Acknowledgment for the heartbeat sent by the client, indicating the server received the heartbeat
};

export const HttpStatusCode = {
    NotFound: 404,
    Created: 201,
    Conflict: 409,
    BadRequest: 400,
    Success: 200,
    Unauthorized: 401,
    InternalServerError: 500,
    Forbidden: 403,
};
