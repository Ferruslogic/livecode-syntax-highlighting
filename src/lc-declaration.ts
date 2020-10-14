
import * as vscode from 'vscode';












export class livecodescriptConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    private format(cmd: string): string {
        return cmd.substr(1).toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): Promise<vscode.DocumentSymbol[]> {
        return new Promise((resolve, reject) => {
            let symbols: vscode.DocumentSymbol[] = [];
            let nodes = [symbols]
            var line = document.lineAt(1);
            let handler_Symbol = new vscode.DocumentSymbol("start", "start",vscode.SymbolKind.Method,  line.range, line.range)

            let inside_marker = false
            let inside_run = false
            let inside_userinput = false
            let inside_handler = false

            let symbolkind_marker = vscode.SymbolKind.Field
            let symbolkind_cmd = vscode.SymbolKind.Method
            let symbolkind_ftn = vscode.SymbolKind.Function
            let symbolkind_event = vscode.SymbolKind.Event
            let symbolkind_getprop = vscode.SymbolKind.Property
            let symbolkind_setprop = vscode.SymbolKind.Property
            let symbolkind_comment = vscode.SymbolKind.String
            let symbolkind_variable = vscode.SymbolKind.Variable


            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);

                let tokensDirty = line.text.split(/\s/)
         

                var tokens = tokensDirty.filter(function (el) {
                    return el != '';
                    
                  });



                ////Event (On)
                if (line.text.match(/^on\s+[\w]+/i)) {
                    handler_Symbol = new vscode.DocumentSymbol(tokens[1], tokens[2], symbolkind_event, line.range, line.range)
 
                    handler_Symbol.name = tokens[1]
                    handler_Symbol.range = line.range
                    handler_Symbol.selectionRange = line.range
                    handler_Symbol.range = line.range

                    

                    inside_handler = true

                    /* if (!inside_handler) {
                        nodes.push(handler_Symbol.children)
                        inside_handler = true
                    } */

                    // hanlder_Symbol.children.push(_boot)
                 
                    }
                    else if (line.text.match(/^end\s/)) {
                 
                        if (inside_handler) {
            
                            handler_Symbol.range=  new vscode.Range(handler_Symbol.range.start, line.range.end);
                            handler_Symbol.selectionRange=handler_Symbol.range
                             
                               nodes[nodes.length - 1].push(handler_Symbol)
                            //nodes.pop()
                            inside_handler = false
                        }
                }
                


                      ////Event (before or afer)
                      if (line.text.match(/^before|^after\s+[\w]+/i)) {
                        let marker_symbol = new vscode.DocumentSymbol(tokens[1], tokens[2], symbolkind_event, line.range, line.range)
                        nodes[nodes.length - 1].push(marker_symbol)
                        if (!inside_marker) {
                            nodes.push(marker_symbol.children)
                            inside_marker = true
                        }
                        // marker_symbol.children.push(_boot)
                    }
                    else if (line.text.match(/^end\s+[\w]+/i)) {
                        // TODO check if nodes has length 1 before popping.
                        if (inside_marker) {
                            nodes.pop()
                            inside_marker = false
                        }
                    }
    

                //////Command
                if (line.text.match(/^command\s+[\w]+/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[1], tokens[2], symbolkind_cmd, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/^end\s+[\w]+/i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }


                //////Private Command
                if (line.text.match(/^(private)\s+command\s+[\w]+/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[2], tokens[3], symbolkind_cmd, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/^end\s+[\w]+/i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }






                ////Function

                if (line.text.match(/^function\s+[\w]+/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[1], tokens[2], symbolkind_ftn, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/^end\s+[\w]+/i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }




                //////Private function
                if (line.text.match(/^(private)\s+function\s+[\w]+/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[2], tokens[3], symbolkind_ftn, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/^end\s+[\w]+/i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }





                ////getprop

                if (line.text.match(/^getprop\s+[\w]+/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[1], tokens[2], symbolkind_getprop, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/^end\s+[\w]+/i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }




                ////setprop
                if (line.text.match(/^setprop\s+[\w]+/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[1], tokens[2], symbolkind_setprop, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/^end\s+[\w]+/i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }


                
                ////Multiline comment
                if (line.text.match(/\/\*/i)) {
                    let marker_symbol = new vscode.DocumentSymbol("comment",  tokens[2], symbolkind_comment, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.match(/\*\//i)) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }

            
                 


                if (line.text.match(/^\s*global|^\s*local/i)) {
                    let marker_symbol = new vscode.DocumentSymbol(tokens[0]+' '+tokens[1],  "variable definition", symbolkind_variable, line.range, line.range)
                    nodes[nodes.length - 1].push(marker_symbol)
                    if (!inside_marker) {
                        //nodes.push(marker_symbol.children)
                       // inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)

                  
                        // TODO check if nodes has length 1 before popping.
                      /*  if (inside_marker) {
                            nodes.pop()
                           // inside_marker = false
                        }*/
                   
    
                }
              



                  
                    
                
                


            }

            resolve(symbols);
        });
    }
}