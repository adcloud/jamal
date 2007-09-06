/* AIRAliases.js - Revision: 0.7 */

// Copyright (c) 2007. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.


var air; if (!air) air = {};

// functions
air.trace = window.runtime.trace;
air.navigateToURL = window.runtime.flash.net.navigateToURL;
air.sendToURL = window.runtime.flash.net.sendToURL;


// file
air.File = window.runtime.flash.filesystem.File;
air.FileStream = window.runtime.flash.filesystem.FileStream;
air.FileMode = window.runtime.flash.filesystem.FileMode;

// events
air.Event = window.runtime.flash.events.Event;
air.FileListEvent = window.runtime.flash.events.FileListEvent;
air.IOErrorEvent = window.runtime.flash.events.IOErrorEvent;
air.InvokeEvent = window.runtime.flash.events.InvokeEvent;
air.HTTPStatusEvent = window.runtime.flash.events.HTTPStatusEvent;
air.SecurityErrorEvent = window.runtime.flash.events.SecurityErrorEvent;
air.AsyncErrorEvent = window.runtime.flash.events.AsyncErrorEvent;
air.NetStatusEvent = window.runtime.flash.events.NetStatusEvent;
air.OutputProgressEvent = window.runtime.flash.events.OutputProgressEvent;
air.ProgressEvent = window.runtime.flash.events.ProgressEvent;
air.StatusEvent = window.runtime.flash.events.StatusEvent;
air.EventDispatcher = window.runtime.flash.events.EventDispatcher;
air.DataEvent = window.runtime.flash.events.DataEvent;
air.TimerEvent = window.runtime.flash.events.TimerEvent;

// native window
air.NativeWindow = window.runtime.flash.display.NativeWindow;
air.NativeWindowDisplayState = window.runtime.flash.display.NativeWindowDisplayState;
air.NativeWindowInitOptions = window.runtime.flash.display.NativeWindowInitOptions;
air.NativeWindowSystemChrome = window.runtime.flash.display.NativeWindowSystemChrome;
air.NativeWindowResize = window.runtime.flash.display.NativeWindowResize;
air.NativeWindowType = window.runtime.flash.display.NativeWindowType;

air.NativeWindowErrorEvent = window.runtime.flash.events.NativeWindowErrorEvent;
air.NativeWindowBoundsEvent = window.runtime.flash.events.NativeWindowBoundsEvent;
air.NativeWindowDisplayStateEvent = window.runtime.flash.events.NativeWindowDisplayStateEvent;

// geom
air.Point = window.runtime.flash.geom.Point;
air.Rectangle = window.runtime.flash.geom.Rectangle;

// net
air.FileFilter = window.runtime.flash.net.FileFilter;

air.LocalConnection = window.runtime.flash.net.LocalConnection;
air.NetConnection = window.runtime.flash.net.NetConnection;

air.URLLoader = window.runtime.flash.net.URLLoader;
air.URLLoaderDataFormat = window.runtime.flash.net.URLLoaderDataFormat;
air.URLRequest = window.runtime.flash.net.URLRequest;
air.URLRequestDefaults = window.runtime.flash.net.URLRequestDefaults;
air.URLRequestHeader = window.runtime.flash.net.URLRequestHeader;
air.URLRequestMethod = window.runtime.flash.net.URLRequestMethod;
air.URLStream = window.runtime.flash.net.URLStream;
air.URLVariables = window.runtime.flash.net.URLVariables;
air.Socket = window.runtime.flash.net.Socket;
air.XMLSocket = window.runtime.flash.net.XMLSocket;

air.Responder = window.runtime.flash.net.Responder;
air.ObjectEncoding = window.runtime.flash.net.ObjectEncoding;

// system
air.Shell = window.runtime.flash.system.Shell;
air.System = window.runtime.flash.system.System;
air.Security = window.runtime.flash.system.Security;
air.Updater = window.runtime.flash.system.Updater;


// capabilities
air.Capabilities = window.runtime.flash.system.Capabilities;
air.NativeWindowCapabilities = window.runtime.flash.system.NativeWindowCapabilities;


// desktop
air.ClipboardManager = window.runtime.flash.desktop.ClipboardManager;
air.TransferableData = window.runtime.flash.desktop.TransferableData;
air.TransferableFormats = window.runtime.flash.desktop.TransferableFormats; 
air.TransferableTransferMode = window.runtime.flash.desktop.TransferableTransferMode;


// utils
air.ByteArray = window.runtime.flash.utils.ByteArray;
air.Dictionary = window.runtime.flash.utils.Dictionary;
air.Endian = window.runtime.flash.utils.Endian;
air.Timer = window.runtime.flash.utils.Timer;


// media
air.ID3Info = window.runtime.flash.media.ID3Info;
air.Sound = window.runtime.flash.media.Sound;
air.SoundChannel = window.runtime.flash.media.SoundChannel;
air.SoundLoaderContext = window.runtime.flash.media.SoundLoaderContext;
air.SoundMixer = window.runtime.flash.media.SoundMixer;
air.SoundTransform = window.runtime.flash.media.SoundTransform;


// sql
air.SQLConnection = window.runtime.flash.data.SQLConnection;
air.SQLStatement = window.runtime.flash.data.SQLStatement;
air.SQLResult = window.runtime.flash.data.SQLResult;
air.SQLError = window.runtime.flash.errors.SQLError;
air.SQLErrorEvent = window.runtime.flash.events.SQLErrorEvent;
air.SQLErrorCode = window.runtime.flash.errors.SQLErrorCode;
air.SQLEvent = window.runtime.flash.events.SQLEvent;
air.SQLUpdateEvent = window.runtime.flash.events.SQLUpdateEvent;
air.SQLTransactionLockType = window.runtime.flash.data.SQLTransactionLockType;
air.SQLColumnNameStyle = window.runtime.flash.data.SQLColumnNameStyle;
air.SQLErrorOperation = window.runtime.flash.errors.SQLErrorOperation;

