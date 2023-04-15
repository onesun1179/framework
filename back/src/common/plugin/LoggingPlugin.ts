import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    console.log('Request started');

    return {
      async didResolveSource(context) {
        console.log(context.source);
      },
      // async willSendResponse() {
      //   console.log('Will send response');
      // },
    };
  }
}
